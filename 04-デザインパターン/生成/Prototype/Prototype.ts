export {}

import _ from "lodash";

/*
- Prototypeパターン
- 既存オブジェクトのコピーをそのクラスに依存することなく可能とするパターン
- つまり、インスタンスからインスタンスのコピーを作る？
- 本質は違いそう、プロトタイプを定義しこれを量産する仕組みを提供することぽい
- 「プロトタイプからインスタンスを生成する」ことができるようにするためのパターン
- 使う場面
  - 初期化方法のみが異なるサブクラスの数を減らしたいとき、プロトタイプから作る
  - クラスからインスタンスを生成するのが難しいとき、プロトタイプから作る
*/

abstract class ItemPrototype {
  constructor(
    public name: string,
    public detail: Detail = {"comment": []}
  ) {}
  
  addComment(comment: string) {
    this.detail.comment.push(comment);
  }

  abstract createCopy(): ItemPrototype;
}

type Detail = {"comment": string[]};

class DeepCopyItem extends ItemPrototype {
  createCopy(): ItemPrototype {
    return _.cloneDeep(this);
  }
}

class ShallowCopyItem extends ItemPrototype {
  createCopy(): ItemPrototype {
    return _.clone(this);
  }
}

class ItemManager {
  items: {[key: string]: ItemPrototype} = {};

  registerItem(key: string, item: ItemPrototype) {
    this.items[key] = item;
  }

  create(key: string) {
    if (key in this.items) {
      const item = this.items[key];
      return item.createCopy();
    }
    throw new Error("指定されたキーは存在しません");
  }
}

function run() {
  const mouse = new DeepCopyItem("マウス");
  mouse.addComment("original");

  const keyboard = new ShallowCopyItem("キーボード");
  keyboard.addComment("original");

  const manager = new ItemManager();
  manager.registerItem("mouse", mouse);
  manager.registerItem("keyboard", keyboard);

  const clonedMouse = manager.create("mouse");
  clonedMouse.addComment("cloned");
  const clonedKeyboard = manager.create("keyboard");
  clonedKeyboard.addComment("cloned");

  console.log("マウス（オリジナル）:", mouse);
  // ディープコピーなので、オリジナルのコメントは変更されない
  console.log("マウス（クローン）:", clonedMouse);

  console.log("キーボード（オリジナル）:", keyboard);
  // シャローコピーなので、オリジナルのコメントも変更される
  console.log("キーボード（クローン）:", clonedKeyboard);
}

run()