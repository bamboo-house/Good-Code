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
  next(): Object
}

interface Aggregate {
  getIterator(): IIterator
}