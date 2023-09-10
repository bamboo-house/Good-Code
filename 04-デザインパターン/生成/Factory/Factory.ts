export {}

/*
- Factory Methodパターン
- 親クラスでインスタンスの生成方法を定め、具体的に何をどうやって作るかは子クラスで定めるパターン
- メリット・デメリット
  - オープンクローズドの原則に違反することなく新しいProductを追加できる
  - 簡単な生成処理の場合はコードが複雑になる
- 使う場面
  - 類似した複数種類のオブジェクト生成する必要がある場合
  - オブジェクト生成の処理をカプセル化したい場合
  - Productの種類や生成手順が頻繁に変更される可能性がある場合
*/

// Product側（実体）
abstract class CreditCard {
  constructor(public owner: string) {}

  getOwner(): string {
    return this.owner;
  }

  abstract getCardType(): string;
  abstract getAnnualCharge(): number;
}

class Platinum extends CreditCard {
  getCardType(): string {
    return "Platinum";
  }

  getAnnualCharge(): number {
    return 30000;
  }
}

class Gold extends CreditCard {
  getCardType(): string {
    return "Gold";
  }

  getAnnualCharge(): number {
    return 10000;
  }
}

// Creator側（生成）
abstract class CreditCardFactory {
  abstract createCreditCard(owner: string): CreditCard;
  abstract registerCreditCard(creditCard: CreditCard): void;

  create(owner: string): CreditCard {
    const creditCard = this.createCreditCard(owner);
    this.registerCreditCard(creditCard);
    return creditCard;
  }
}

const creditCardDatabase: CreditCard[] = [];

class PlatinumCreditCardFactory extends CreditCardFactory {
  createCreditCard(owner: string): CreditCard {
    return new Platinum(owner);
  }

  registerCreditCard(creditCard: CreditCard): void {
    creditCardDatabase.push(creditCard);
  }
}

class GoldCreditCardFactory extends CreditCardFactory {
  createCreditCard(owner: string): CreditCard {
    return new Gold(owner);
  }

  registerCreditCard(creditCard: CreditCard): void {
    creditCardDatabase.push(creditCard);
  }
}

function run() {
  const platinumCardFactory = new PlatinumCreditCardFactory();
  const platinumCard = platinumCardFactory.create("山田");
  console.log(platinumCard);
  console.log(platinumCard.getOwner());

  const goldCardFactory = new GoldCreditCardFactory();
  const goldCard = goldCardFactory.create("田中");
  console.log(goldCard);
  console.log(goldCard.getOwner());
}

run();