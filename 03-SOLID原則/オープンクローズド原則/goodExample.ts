export {}

interface IEmployee {
  name: string;
  getBonus(base: number): number;
}

class JuniorEmployee implements IEmployee {
  constructor(public name: string) {}

  getBonus(base: number): number {
    return Math.floor(base * 1.1);
  }
}

class MiddleEmployee implements IEmployee {
  constructor(public name: string) {}

  getBonus(base: number): number {
    return Math.floor(base * 1.5);
  }
}

class SeniorEmployee implements IEmployee {
  constructor(public name: string) {}

  getBonus(base: number): number {
    return Math.floor(base * 2);
  }
}

class ExpertEmployee implements IEmployee {
  constructor(public name: string) {}

  getBonus(base: number): number {
    return Math.floor(base * 3);
  }
}

function run() {
  const emp1 = new JuniorEmployee("山田");
  const emp2 = new MiddleEmployee("田中");
  const emp3 = new SeniorEmployee("佐藤");
  const emp4 = new ExpertEmployee("鈴木");

  const base = 100;
  console.log(`${emp1.name}のボーナスは${emp1.getBonus(base)}円です`);
  console.log(`${emp2.name}のボーナスは${emp2.getBonus(base)}円です`);
  console.log(`${emp3.name}のボーナスは${emp3.getBonus(base)}円です`);
  console.log(`${emp4.name}のボーナスは${emp4.getBonus(base)}円です`);
}

run()