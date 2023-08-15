// @ts-nocheck

/*
- 特定の時間でかつ、順番に実行する必要があるものを集めたモジュール
- 共通したデータは使わない
- 例えば：アクセス権を確認してファイルに書き込む
*/

function proceduralCohesion(fileName: string) {
  if(!existFile(fileName)) {throw new Error("File not found")}
  if(!checkPermission(fileName)) {throw new Error("Permission denied")}
  const file = fileOpen(fileName)

  writeToFile(file) // ファイル書き込み
}