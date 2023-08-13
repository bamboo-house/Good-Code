// @ts-nocheck

/*
- 論理的に似たようなことをするものを集めたモジュール
- 例えば：フラグによって動作を変える
- aとbなどの関連が薄い処理が１つの関数に混在している
- この関数の実行側は内部構造を知っている状態で引数を渡す必要がある
*/


function logicalCohesion(flag: boolean) {
  if(flag) {
    a()
  }
  else {
    b()
  }
}