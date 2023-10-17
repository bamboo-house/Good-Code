import { createStatementData } from "./createStatementData";

export type Perf = { playID: string; audience: number };
export type Invoices = { customer: string; performances: Perf[] };
export type Play = { name: string; type: string };
export type Plays = { [key: string]: Play };

export type EnrichPerf = {
  playID: string;
  audience: number;
  play: Play;
  amount: number;
  volumeCredits: number;
};
export type statementData = {
  customer: string;
  performances: EnrichPerf[];
  totalAmount: number;
  totalVolumeCredits: number;
};

export function statement(invoice: Invoices, plays: Plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data: statementData) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    // 注文の内訳を出力
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;

  function usd(aNumber: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }
}
