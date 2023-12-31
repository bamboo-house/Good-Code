import { EnrichPerf, Invoices, Perf, Play, Plays } from "./statement";

interface IPerformanceCalculator {
  aPerformance: Perf;
  play: Play;
  amount: number;
  volumeCredits: number;
}

class PerformanceCalculator implements IPerformanceCalculator {
  constructor(public aPerformance: Perf, public play: Play) {}

  get amount(): number {
    throw new Error("サブクラスの責務");
  }

  get volumeCredits() {
    return Math.max(this.aPerformance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount(): number {
    let result = 40000;
    if (this.aPerformance.audience > 30) {
      result += 1000 * (this.aPerformance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount(): number {
    let result = 30000;
    if (this.aPerformance.audience > 20) {
      result += 10000 + 500 * (this.aPerformance.audience - 20);
    }
    result += 300 * this.aPerformance.audience;
    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.aPerformance.audience / 5);
  }
}

function createPerformanceCalculator(aPerformance: Perf, aPlay: Play) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`unknown type: ${aPlay.type}`);
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
    // ここのcalculatorはポリモーフィズム対象である。calculator.amountなど勝手に条件分岐してくれる
    const calculator: IPerformanceCalculator = createPerformanceCalculator(
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
