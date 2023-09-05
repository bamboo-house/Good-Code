export {}

/*
- オープンクローズドの原則
- 拡張に対しては開いていて、修正に対しては閉じている
- つまり、既存のコードを変更せずに、新しい機能を追加できるようにする
- つまり、カテゴリーの中の各属性を単一責任（クラス）にして、それらを司るインターフェースor抽象クラスを作成する
*/

// 従業員の職位
type Grade = "junior" | "middle" | "senior";

class Employee {
  constructor(
    public name: string,
    public grade: Grade,
  ) {}
}

class BonusCalculator {
  constructor(
    public base: number
  ) {}

  getBonus(employee: Employee): number {
    if (employee.grade === "junior") {
      return Math.floor(this.base * 1.1);
    } else if (employee.grade === "middle") {
      return Math.floor(this.base * 1.5);
    } else {
      return Math.floor(this.base * 2);
    }
  }
}

function run() {
  const emp1 = new Employee("山田", "junior");
  const emp2 = new Employee("田中", "middle");
  const emp3 = new Employee("佐藤", "senior");

  const bonusCalculator = new BonusCalculator(100);

  console.log(`${emp1.name}のボーナスは${bonusCalculator.getBonus(emp1)}円です`);
  console.log(`${emp2.name}のボーナスは${bonusCalculator.getBonus(emp2)}円です`);
  console.log(`${emp3.name}のボーナスは${bonusCalculator.getBonus(emp3)}円です`);
}

run()