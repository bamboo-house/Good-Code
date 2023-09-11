export {}

/*
- 依存性逆転の原則
- 高レベルのモジュールは低レベルのモジュールに依存してはいけない、どちらのモジュールも抽象に依存すべき
- つまり、インターフェースを定義して、依存関係を逆転させる
- なぜ？
  - テスタビリティを高めるため
  - 拡張性を高めるため
  - 依存方向はイミュータブルなクラスに向くべき、なぜなら変わらないものに依存する方が変わるものに依存するより安定するから
*/  

class User {}

class UserController {
  private userService = new UserService()
  
  create(user: User): User {
    return this.userService.create(user)
  }

  findById(id: string): User {
    return this.userService.findById(id)
  }
}

class UserService {
  private userRepository = new UserRdbRepository()

  create(user: User): User {
    return this.userRepository.create(user)
  }

  findById(id: string): User {
    return this.userRepository.findById(id)
  }
}

class UserRdbRepository {
  create(user: User): User {
    console.log("RDBにUserを保存")
    return user;
  }

  findById(id: string): User {
    console.log(`ID: ${id}のUserをRDBから取得`)
    return new User();
  }
}

function run() {
  const userController  = new UserController()
  userController.findById("123")
}

run()