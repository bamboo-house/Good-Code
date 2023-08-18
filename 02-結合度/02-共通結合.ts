
/*
- 共通のグローバル変数で結合されている
- 変更が加えられると、予期しない副作用が発生する可能性がある
*/

// common coupling

let data: string = 'data';

function updateA() {
  data = 'A';
}

function updateB() {
  data = 'B';
}
