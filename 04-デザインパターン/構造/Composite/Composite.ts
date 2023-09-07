export {}

/*
- Composite パターンは、 単純なリーフと複雑なコンテナからなる
- コンテナは、リーフと他のコンテナを含むことができる
- フォルダの中にファイルとフォルダどちらも置きたい、みたいなとき
- それぞれのオブジェクトは同一視できる。つまり、クライアントはフォルダかファイルかを意識しなくてもいい
- クライアントが単純な要素と複雑な要素を同等に扱えるようにする
- 具体的な実装方法：https://refactoring.guru/ja/design-patterns/composite https://refactoring.guru/ja/design-patterns/composite/typescript/example
*/

abstract class Entry {
  constructor(private name: string) {}

  getName(): string {
    return this.name;
  }

  abstract getSize(): number;
  abstract remove(): void;
}

class File extends Entry {
  constructor(name: string, private size: number) {
    super(name);
  }

  getSize(): number {
    return this.size;
  }

  remove() {
    console.log(`${this.getName()}を削除しました`);
  }
}

class Directory extends Entry {
  private children: Entry[];

  constructor(name: string) {
    super(name);
    this.children = [];
  }

  getSize(): number {
    let size = 0;
    this.children.forEach(child => size += child.getSize());
    return size;
  }

  remove() {
    this.children.forEach(child => child.remove());
    console.log(`${this.getName()}を削除しました`);
  }

  add(child: Entry) {
    this.children.push(child);
  }
}

// 操作してみる
function client(entry: Entry) {
  console.log(`${entry.getName()}: ${entry.getSize()}`);
  entry.remove();
}

function run() {
  const dir1 = new Directory('04-デザインパターン');
  const dir2 = new Directory('構造');
  const dir3 = new Directory('Composite');
  const file1 = new File('Composite.ts', 100);
  const file2 = new File('クラス図.drawio', 200);

  dir3.add(file1);
  dir3.add(file2);
  dir2.add(dir3);
  dir1.add(dir2);

  client(dir1);
}

run()