export {}

/*
- Interatorパターン
- 集約オブジェクトの要素に順番にアクセスする方法を提供する
*/


class Patient {
  constructor(public id: number, public name: string) {}
}

interface IIterator {
  hasNext(): boolean
  next(): any
}

interface Aggregate {
  getIterator(): IIterator
}

class WaitingRoom implements Aggregate {
  private patients: Patient[] = [];

  getPatinets(): Patient[] {
    return this.patients;
  }

  getCount(): number {
    return this.patients.length;
  }

  checkIn(patient: Patient): void {
    this.patients.push(patient);
  }

  getIterator(): IIterator {
    return new WaitingRoomIterator(this);
  }
}

class WaitingRoomIterator implements IIterator {
  private position: number = 0;

  constructor(private aggregate: WaitingRoom) {}

  hasNext(): boolean {
    return this.position < this.aggregate.getCount();
  }

  next() {
    if (!this.hasNext()) {
      console.log('患者がいません');
      return;
    }

    const patient = this.aggregate.getPatinets()[this.position];
    this.position++;
    return patient;
  }
}

function run() {
  const waitingRoom = new WaitingRoom();
  waitingRoom.checkIn(new Patient(1, 'Yamada'));
  waitingRoom.checkIn(new Patient(2, 'Suzuki'));
  waitingRoom.checkIn(new Patient(3, 'Tanaka'));

  const iterator = waitingRoom.getIterator();
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
}

run();