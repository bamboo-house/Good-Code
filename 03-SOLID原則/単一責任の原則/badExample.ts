export {}

/*
単一責任の原則
- クラスはたった一つのアクターに対して責務を負うべきである
- つまり、アクターが異なるクラスはアクターごとに分割すべきで、アクターごとにクラスを用意する
- 例：何がダメかっていうと、色々あるが、１つはクラスの責務が複数のアクターに分散しており、クラスを理解するのが難しくなること
- イベントエンティティを捉えている？（CRUDが作れる）
*/

class Employee {
  constructor(
    public name: string,
    public department: string,
  ) {}

  // 経理部門がアクター
  calculatePay() {
    this.getRegularHours();
    console.log(`${this.name}の給料を計算しました`);
  }

  // 人事部門がアクター
  reportHours() {
    this.getRegularHours();
    console.log(`${this.name}の労働時間をレポートしました`);
  }

  // データベース管理者がアクター
  save() {
    console.log(`${this.name}の情報をデータベースに保存しました`);

  }

  private getRegularHours() {
    // 仕様変更前
    console.log("経理部門・人事部門が共通で使う処理")
  }
}

function run() {
  const emp = new Employee("山田", "経理");

  console.log("経理部門がアクターの処理");
  emp.calculatePay();

  console.log("人事部門がアクターの処理");
  emp.reportHours();
}

run();