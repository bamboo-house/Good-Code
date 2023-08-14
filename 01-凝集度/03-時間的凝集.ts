// @ts-nocheck

/*
- 時間的に近く動作するものを集めたモジュール
- 特定の時間に実行される複数の処理がまとまっている
- 実行順序を入れ替えても動作する
- 例えば：初期化処理など
*/


function temporalCohesion() {
  const config = initConfig()
  const db = initLogger()
  const logger =initDB()

  return { config, db, logger }
}
