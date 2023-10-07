- 昔のデザインパターンの位置付け
	- ウォーターフォール開発が主流
	- 次の工程に行くと戻れないので、最初からスケーラブルな設計を作ろう
	- そのために、冗長になったとしてもデザインパターンを使おう
- 現代のデザインパターンの位置付け
	- リファクタリングと自動テストの登場
	- アジャイル開発が主流
	- MVP開発のために、最初はシンプルに作ろう（YAGNI原則）
	- リリース後、リファクタリングのターゲットとしてデザインパターンを使おう
	- リファクタリングのターゲットとしてデザインパターン。方向付けと語彙


参考

https://www.techscore.com/tech/DesignPattern/Prototype
https://refactoring.guru/ja/design-patterns/facade

https://www.udemy.com/course/typescript-solid-design-patterns/learn/lecture/34318282#content
 
  
コア：最も多く使われるパターン、日々の業務でしょっちゅう出てくる

（構造）
- Composite（全体と部分の同一視、1とNの同一視）
- Proxy
- Facade
（振る舞い）
- Strategy
- State
- Command
- Iterator
- Template Method
（生成）
- Factory
- Prototype
- Builder
- Dependency Injection

フェリフェラル（あまり使わない、コアではない）

（振る舞い）
- Mediato
- Visitor
（生成）
- Abstract Factory
- Decorator
- タイプオブジェクト
- ヌルオブジェクト（コンポジットの亜種）
- エクステンションオブジェクト（プラグアブルなパターン）

アザー（その他）
- フライウェイと
- インタープリター
