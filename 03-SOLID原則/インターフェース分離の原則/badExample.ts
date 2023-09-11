export {}

/*
- インターフェース分離の原則
- インターフェースは、クライアントに必要なものだけを提供するべきである
- つまり、クライアントで使わないメソッドがインターフェースに含まれている場合は、インターフェンスを分離しましょうということ
*/


interface Vehicle {
  name: string;
  color: string;
  start(): void;
  stop(): void;
  fly(): void;
}

class Airplane implements Vehicle {
  constructor(
    public name: string,
    public color: string
  ) {}

  start() {
    console.log('start');
  }

  stop() {
    console.log('stop');
  }

  fly() {
    console.log('fly');
  }
}

class Car implements Vehicle {
  constructor(
    public name: string,
    public color: string
  ) {}
  
  start(): void {
    console.log('start');
  }

  stop(): void {
    console.log('stop');
  }

  fly(): void {
    throw new Error('車は空を飛べません');
  }
}

function run() {
  const v1: Vehicle = new Airplane('Boeing', 'white');
  const v2: Vehicle = new Car('Toyota', 'red');

  // v1,v2ともにカーソル上でVehicleと表示されているにもかかわらず、
  // v2はflyメソッドを持っていないのはインターフェース分離の原則に違反している
  v1.fly();
  v2.fly();
}

run();