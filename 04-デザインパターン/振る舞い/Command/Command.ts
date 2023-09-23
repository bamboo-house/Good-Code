export {}

/*
- Commandパターン
- 命令（メソッド）を独立したオブジェクトとして表現する
- 命令をオブジェクトとして表現することで、ネットワークを通してコマンドを送信できたり、ログに記録したりできる
- 命令の実行を行うオブジェクトと命令の受け手を分離する
- 送り手と受け手との間で単方向の接続を確立する
- Commandは命令をカプセル化して、順序操作や受け渡しなどを可能にする。Strategyはアルゴリズムをカプセル化して、切り替え可能にする。
- 登場クラス：Sender, Receiver, Command
- クライアントの動き
  - Receiverを作成
  - ReceiverをCommandに注入して、Commandを作成
  - Senderを作成し、Commandを追加する
- 使う場面
  - 操作を待ち行列に入れたり、実行をスケジュールしたり、リモートで実行したい時
  - undo/redoを実装したい時

*/


// Receiver
class File {
  constructor(private name: string) {}

  open(): void {
    console.log(`${this.name}が開かれました`)
  }

  compress(): void {
    console.log(`${this.name}が圧縮されました`)
  }

  close(): void {
    console.log(`${this.name}が閉じられました`)
  }
}

// Command
interface Command {
  execute(): void
}


class OpenCommand implements Command {
  constructor(private file: File){}
  execute(): void {
    this.file.open()
  }
}

class CompressCommand implements Command {
  constructor(private file: File){}
  execute(): void {
    this.file.compress()
  }
}

class CloseCommand implements Command {
  constructor(private file: File){}
  execute(): void {
    this.file.close()
  }
}

// Sender
class Queue {
  private commands: Command[] = []

  addCommand(command: Command): void {
    this.commands.push(command)
  }

  executeCommand(): void {
    this.commands.forEach(command => command.execute())
  }
}

function run() {
  const file = new File('sample.txt');
  const queue = new Queue();

  queue.addCommand(new OpenCommand(file))
  queue.addCommand(new CompressCommand(file))
  queue.addCommand(new CloseCommand(file))

  queue.executeCommand();
}

run()
