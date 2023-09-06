export {}

/*
- リスコフの置換原則
- サブクラスはそのスーパークラスと置換可能でなければならない
- スーパークラスとサブクラスの継承関係が間違っている場合は、意図しない振る舞いをする
- つまり、リスコフの置換原則に違反している場合は、継承関係が正しくない
- 例：下の例だと、継承しているのにも関わらず、長方形の代わりに正方形を使うと意図しない振る舞いをする
- つまり、利用者はスーパータイプとサブタイプは同じ挙動を期待しているのにも関わらず、利用者はサブタイプを理解した上で利用しなければならない
- 正しい継承 = 「is-a関係」 + 「振る舞いの同等性」
- 改善案としては、継承が成り立たないので、インターフェースを使うなど
- つまり、extendsではなく、implementsを使う
*/


// サブクラスがスーパークラスを置換できない例
// スーパークラス
class Rectangle {
  width = 0;
  height = 0;

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

// サブクラス
class Square extends Rectangle {
  setWidth(width: number) {
    super.setWidth(width)
    super.setHeight(width)
  }

  setHeight(height: number) {
    super.setWidth(height)
    super.setHeight(height)
  }
}

function f(r: Rectangle, width: number, height: number): number {
  r.setWidth(width);
  r.setHeight(height);
  return r.getArea();
}

function run() {
  const r1: Rectangle = new Rectangle();
  const r2: Rectangle = new Square();

  console.log(f(r1, 3, 4));
  console.log(f(r2, 3, 4));
}

run()