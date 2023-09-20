export {}

/*
- Stateパターン
- 状態を表すクラスを作成し、状態によって振る舞いを変える
- つまり、状態をクラスにして、ポリモーフィズムで条件文をなくす
- 状態の遷移はメソッドで行う
- 例
  - 記事の状態：publishやdraft, modulateなど
  - 認証の状態など
- 使う場面
  ー 状態によって条件分岐が多くなる場合（例えば、documentsのpublishやdraftなど）
- 所感
  - if文全部消せちゃうくない？
*/

interface UserState {
  isAuthenticated(): boolean;
  desplayPage(): void;
  nextState(): UserState;
}

class AuthorizedState implements UserState {
  isAuthenticated(): boolean {
    return true;
  }

  desplayPage(): void {
    console.log("Topページ");
  }

  nextState(): UserState {
    return new UnAuthorizedState();
  }
}

class UnAuthorizedState implements UserState {
  isAuthenticated(): boolean {
    return false;
  }

  desplayPage(): void {
    console.log("エラーページ：認証されていません");
  }

  nextState(): UserState {
    return new AuthorizedState();
  }
}

class User {
  private state: UserState = new UnAuthorizedState();

  isAuthenticated(): boolean {
    return this.state.isAuthenticated();
  }

  desplayPage(): void {
    this.state.desplayPage();
  }

  switchState(): void {
    this.state = this.state.nextState();
  }
}

function run() {
  const user = new User();
  console.log(user.isAuthenticated());
  user.desplayPage();

  user.switchState();
  console.log(user.isAuthenticated());
  user.desplayPage();
}

run()