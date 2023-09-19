export {}

/*
- Strategyパターン
- ロジックをプログラムから切り離して、独立したクラスにカプセル化する。クライアントはクラスの切り替えが簡単にできる
- ダックタイピングぽい
- 使い所
  - 同じような振る舞いがあるとき
  - ロジックを切り替える条件分の塊がある場合に使用する

*/


interface SortStrategy {
  sort(): void;
}

class BubbleSort implements SortStrategy {
  sort(): void {
    console.log('バブルソート');
  }
}

class InsertionSort implements SortStrategy {
  sort(): void {
    console.log('挿入ソート');
  }
}

class SortContext {
  // strategyを変更して使用する場合は、コンストラクタ外でstrategyを宣言する
  private strategy: SortStrategy;
  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  sort(): void {
    this.strategy.sort();
  }
}

function run() {
  const bubbleSort = new BubbleSort();
  const insertionSort = new InsertionSort();

  const sortContext = new SortContext(bubbleSort);
  sortContext.sort();

  sortContext.setStrategy(insertionSort);
  sortContext.sort();
}

run()