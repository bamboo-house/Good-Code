type Perf = { playID: string; audience: number };
type Invoices = { customer: string; performances: Perf[] };
type Play = { name: string; type: string };
type Plays = { [key: string]: Play };

type EnrichPerf = {
  playID: string;
  audience: number;
  play: Play;
  amount: number;
};
type statementData = { customer: string; performances: EnrichPerf[] };

export function statement(invoice: Invoices, plays: Plays) {
  const statementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  };
  return renderPlainText(statementData);

  function enrichPerformance(aPerformance: Perf): EnrichPerf {
    const result = Object.assign(
      {},
      {
        ...aPerformance,
        play: playFor(aPerformance),
        amount: amountFor(aPerformance),
      }
    );
    return result;
  }

  function playFor(aPerformance: Perf): Play {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance: Perf): number {
    let result = 0;

    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
  }
}

function renderPlainText(data: statementData) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    // 注文の内訳を出力
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  function usd(aNumber: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of data.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function volumeCreditsFor(aPerformance: EnrichPerf) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === aPerformance.play.type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  }

  function totalAmount() {
    let result = 0;
    for (let perf of data.performances) {
      result += perf.amount;
    }
    return result;
  }
}
