import { EnrichPerf, Invoices, Perf, Play, Plays } from "./statement";

class PerformanceCalculator {
  constructor(public aPerformance: Perf, public play: Play) {}

  get amount(): number {
    let result = 0;
    switch (this.play.type) {
      case "tragedy":
        result = 40000;
        if (this.aPerformance.audience > 30) {
          result += 1000 * (this.aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (this.aPerformance.audience > 20) {
          result += 10000 + 500 * (this.aPerformance.audience - 20);
        }
        result += 300 * this.aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${this.play.type}`);
    }
    return result;
  }

  get volumeCredits() {
    let result = 0;
    result += Math.max(this.aPerformance.audience - 30, 0);
    if ("comedy" === this.play.type)
      result += Math.floor(this.aPerformance.audience / 5);
    return result;
  }
}

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
    const calculator = new PerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    const result = Object.assign(
      {},
      {
        ...aPerformance,
        play: calculator.play,
        amount: calculator.amount,
        volumeCredits: calculator.volumeCredits,
      }
    );
    return result;
  }

  function playFor(aPerformance: Perf): Play {
    return plays[aPerformance.playID];
  }

  function totalVolumeCredits(enrichPerf: EnrichPerf[]) {
    return enrichPerf.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function totalAmount(enrichPerf: EnrichPerf[]) {
    return enrichPerf.reduce((total, p) => total + p.amount, 0);
  }
}
