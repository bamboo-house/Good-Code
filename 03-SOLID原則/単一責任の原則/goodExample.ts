export {}

/*
単一責任の原則
- クラスはたった一つのアクターに対して責務を負うべきである
- アクターが異なるクラスはアクターごとに分割すべき 
*/


class EmployeeData {
  constructor(
    public name: string,
    public department: string,
  ) {}
}

class PayCalculator {
  private getRegularHours() {
    console.log("給与計算用の労働時間計算ロジック");
  }

  calculatePay(employee: EmployeeData) {
    this.getRegularHours();
    console.log(`${employee.name}の給料を計算しました`);
  }
}

class HourReporter {
  private getRegularHours() {
    console.log("労働時間レポート用の労働時間計算ロジック");
  }

  reportHours(employee: EmployeeData) {
    this.getRegularHours();
    console.log(`${employee.name}の労働時間をレポートしました`);
  }
}

class EmployeeRepository {
  save() {}
}

function run() {
  const employeeData = new EmployeeData("鈴木", "開発");
  const payCalculator = new PayCalculator();
  const hourReporter = new HourReporter();

  console.log("経理部門がアクターの処理");
  payCalculator.calculatePay(employeeData);
  console.log("")
  console.log("人事部門がアクターの処理");
  hourReporter.reportHours(employeeData);
}

run();