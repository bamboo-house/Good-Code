// @ts-nocheck

/*
- 特定の時間に実行される処理がまとまっている
- 時間的に近く動作するものを集めたモジュール
- 実行順序を入れ替えても動作する
- 例えば：初期化処理など
*/

function temporalCohesion() {
  const config = initConfig()
  const db = initLogger()
  const logger = initDB()

  return { config, db, logger }
}

/*
- 許されない時間的凝集の関数
- 時間的凝集の関数は、このように具体的な処理を書くのではなく、
- 極力、機能的凝集の関数を実行することに徹するべきである
*/
function badTemporalCohesion(logFileName: string) {
  // Configの読み込み
  const key = os.Getenv("KEY")
  const apiVersion = os.Getenv("API_VERSION")
  const config = Config(key, apiVersion)

  // DBへの接続
  const mysql = MySQL(config)
  mysql.SetMaxIdleConns(10)
  mysql.SetMaxOpenConns(10)
  const db = DB(mysql)

  // ログの初期化
  const file = os.OpenFile(logFileName)
  const logger = Logger(file)

  return config, db, logger
}