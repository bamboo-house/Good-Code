export {}

/*
単一責任の原則
- クラスはたった一つのアクターに対して責務を負うべきである
- アクターが異なるクラスはアクターごとに分割すべき 
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

  // データベース管理者がアクター
}