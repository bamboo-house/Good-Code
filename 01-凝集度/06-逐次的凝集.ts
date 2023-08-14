// @ts-nocheck

/*
- 順番に実行かつ、手順間で値の受け渡しをする
- 例えば：ファイルを取得して変換して保存する
*/

function sequentialCohesion() {
  const file = getFile() // ファイル取得
  const transfromed = transform(file) // ファイル変換
  saveFile(transfromed) // ファイル保存
}