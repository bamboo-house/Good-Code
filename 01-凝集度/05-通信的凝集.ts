// @ts-nocheck

/*
- 順番に実行かつ、手順間で同じ値を利用する
- 同じデータを扱う部分を集めたモジュール
*/

function communicationalCohesion(data: Data): Data {
  changeA(data)
  changeB(data)
  changeC(data)

  return data
}