export {}

/*
- 下記の例では依存性の注入もやっちゃってる
- TestRepositoryなど、簡単に差し替えられるようになった
*/

class User {}

interface IUserService {
  create(user: User): User
  findById(id: string): User
}

class UserController implements IUserService {
  constructor(private userService: IUserService) {
    this.userService = userService
  }
  
  create(user: User): User {
    return this.userService.create(user)
  }

  findById(id: string): User {
    return this.userService.findById(id)
  }
}

interface IUserRepository {
  create(user: User): User
  findById(id: string): User
}

class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository
  }
  
  create(user: User): User {
    return this.userRepository.create(user)
  }

  findById(id: string): User {
    return this.userRepository.findById(id)
  }
}

class UserRdbRepository implements IUserRepository {
  create(user: User): User {
    console.log("RDBにUserを保存")
    return user;
  }

  findById(id: string): User {
    console.log(`ID: ${id}のUserをRDBから取得`)
    return new User();
  }
}

class TestRepository implements IUserRepository {
  create(user: User): User {
    console.log("RDBにUserを保存")
    return user;
  }

  findById(id: string): User {
    console.log(`Test ID: ${id}のUserをRDBから取得`)
    return new User();
  }
}

function run() {
  // const userRepository = new UserRdbRepository()
  const userRepository = new TestRepository()
  const userService = new UserService(userRepository)
  const userController = new UserController(userService)
  userController.findById("123")
}

run()