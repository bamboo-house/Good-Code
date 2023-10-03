export {}

/*
- Template Methodパターン
- スーパークラス内でアルゴリズムの骨格を定義しておき、 サブクラスは構造を変えることなくアルゴリズムの特定のステップを上書き（オーバーライド）します
- 処理フローの全体構造は変えることなく、処理の一部のみを変更できる

*/

abstract class TestTemplate {
  test() {
    this.setup();
    this.execute();
    this.teardown();
  }

  abstract setup(): void;
  abstract execute(): void;

  teardown() {
    console.log('teardown');
  }
}

class ItemServiceTest extends TestTemplate {
  setup() {
    console.log('setup: ItemServiceTest');
  }

  execute() {
    console.log('execute: ItemServiceTest');
  }
}

class UserServiceTest extends TestTemplate {
  setup() {
    console.log('setup: UserServiceTest');
  }

  execute() {
    console.log('execute: UserServiceTest');
  }

  teardown() {
    console.log('teardown: UserServiceTest');
  }
}

function run() {
  const itemServiceTest = new ItemServiceTest();
  const userServiceTest = new UserServiceTest();

  itemServiceTest.test();
  console.log("")
  userServiceTest.test();
}

run();
