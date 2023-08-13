// @ts-nocheck

/*
- 最悪なパターン。必ず避けるべき
- 適当に集められたのがモジュールになっている
- モジュール内の各部分には特に関連性はない
*/

function coincidentalCohesion() {
  const data = getData(); // データ取得
  console.log("Hello World") // 出力
  calcPrimeNumber(10); // 素数計算
}