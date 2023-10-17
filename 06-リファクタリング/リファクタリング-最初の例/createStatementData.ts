import { EnrichPerf, Invoices, Perf, Play, Plays } from "./statement";

export function createStatementData(invoice: Invoices, plays: Plays) {
  const enrichPerf = invoice.performances.map(enrichPerformance);
  const result = {
    customer: invoice.customer,
    performances: enrichPerf,
    totalAmount: totalAmount(enrichPerf),
    totalVolumeCredits: totalVolumeCredits(enrichPerf),
  };
  return result;

  function enrichPerformance(aPerformance: Perf): EnrichPerf {
    const result = Object.assign(
      {},
      {
        ...aPerformance,
        play: playFor(aPerformance),
        amount: amountFor(aPerformance),
        volumeCredits: volumeCreditsFor(aPerformance),
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

  function volumeCreditsFor(aPerformance: Perf) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  }

  function totalVolumeCredits(enrichPerf: EnrichPerf[]) {
    return enrichPerf.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function totalAmount(enrichPerf: EnrichPerf[]) {
    return enrichPerf.reduce((total, p) => total + p.amount, 0);
  }
}
