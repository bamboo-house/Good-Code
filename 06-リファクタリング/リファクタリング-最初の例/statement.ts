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

export function htmlStatement(invoice: Invoices, plays: Plays) {
  return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data: statementData) {
  let result = `Statement for ${data.customer}\n`;
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";

  for (let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }

  result += "<table>\n";
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;

  function usd(aNumber: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }
}
