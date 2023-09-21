export {}

/*
- Commandパターン

*/


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
