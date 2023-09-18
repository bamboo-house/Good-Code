export {}

/*
- Builderパターン
- 複雑なオブジェクト(車や家など）を段階的に構築できるようにするパターン
- 家を建てるときのように、床、壁、屋根などを段階的に組み上げていくようなイメージ
- インスタンスの構築コードを自クラスから抽出して、ビルダークラスにまとめる
- ディレクタークラスはその構築ステップを決める。
- 厳密には必要ないけどディレクタークラスを用意することでクライアントからの再利用に備えることができる
- 使い所
  - サブクラスが大量にある場合
  - コンストラクタの引数が多い場合
*/

class Computer {
  type: string | undefined;
  cpu: string | undefined;
  ram: number | undefined;
}

interface ComputerBuilder {
  addCpu(cpu: string): void;
  addRam(ram: number): void;
}

class DesktopBuilder implements ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
    this.computer.type = "Desktop";
  }

  addCpu(cpu: string) {
    this.computer.cpu = cpu;
  }

  addRam(ram: number) {
    this.computer.ram = ram;
  }

  getResult(): Computer {
    return this.computer;
  }
}

class LaptopBuilder implements ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
    this.computer.type = "Laptop";
  }

  addCpu(cpu: string) {
    this.computer.cpu = cpu;
  }

  addRam(ram: number) {
    this.computer.ram = ram;
  }

  getResult(): Computer {
    return this.computer;
  }
}

class Director {
  constructor(private builder: ComputerBuilder) {}

  construct() {
    this.builder.addCpu("Intel Core i5");
    this.builder.addRam(16);
  }

  highSpecConstruct() {
    this.builder.addCpu("Intel Core i9");
    this.builder.addRam(64);
  }
}

function run() {
  const desktopBuilder = new DesktopBuilder();
  const desktopDirector = new Director(desktopBuilder);
  desktopDirector.construct();
  const desktopComputer = desktopBuilder.getResult();
  console.log(desktopComputer);

  const laptopBuilder = new LaptopBuilder();
  const laptopDirector = new Director(laptopBuilder);
  laptopDirector.highSpecConstruct();
  const laptopComputer = laptopBuilder.getResult();
  console.log(laptopComputer);
}

run();