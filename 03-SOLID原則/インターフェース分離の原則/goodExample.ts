export {}

interface Vehicle {
  name: string;
  color: string;
}

interface Movable {
  start(): void;
  stop(): void;
}

interface Flyable {
  fly(): void;
}

class Airplane implements Vehicle, Movable, Flyable {
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

class Car implements Vehicle, Movable {
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
}

function run() {
  const v1 = new Airplane('Boeing', 'white');
  const v2 = new Car('Toyota', 'red');

  v1.fly();
  v2.start();
}

run();