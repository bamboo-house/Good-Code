type Perf = { playID: string, audience: number, play?: Play }
type Invoices = { customer: string, performances: Perf[] }
type Play = { name: string, type: string }
type Plays = {[key: string]: Play}

export function statement(invoice: Invoices, plays: Plays) {
  const statementData = { customer: invoice.customer, performances: invoice.performances.map(enrichPerformance) };
  return renderPlainText(statementData, invoice, plays)

  function enrichPerformance(aPerformance: Perf) {
    const result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    return result;
  }

  function playFor(aPerformance: Perf): Play {
    return plays[aPerformance.playID];
  }
}

function renderPlainText(data: Invoices, invoice: Invoices, plays: Plays) {
  let result = `Statement for ${data.customer}\n`

  for (let perf of data.performances) {
    // 注文の内訳を出力
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`
  }

  result += `Amount owed is ${usd(totalAmount())}\n`
  result += `You earned ${totalVolumeCredits()} credits\n`
  return result

  function usd(aNumber: number) {
    return new Intl.NumberFormat("en-US",
      {style: "currency", currency: "USD", minimumFractionDigits: 2}).format(aNumber / 100);
  }

  function volumeCreditsFor(aPerformance: Perf) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5)
    return result;
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of data.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function totalAmount() {
    let result = 0
    for (let perf of data.performances) {
      result += amountFor(perf);
    }
    return result
  }

  function amountFor(aPerformance: Perf): number {
    let result = 0

    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30)
        }
        break
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20)
        }
        result += 300 * aPerformance.audience
        break
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`)
    }
    return result
  }
}