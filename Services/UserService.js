class UserService {

  constructor(userDao){
    this.userDao = userDao;
  }


  async getUser({username}){
    let user = await this.userDao.getUser(username);
    return user;
  }

  async getUserbyId({_id}){
    console.log("User serverice :" + _id);
    let user = await this.userDao.getUserbyId(_id);
    return user;
  }
// Helper function, could do it in one function but im trying to get in the habit.
  async newUser({username,password}){
    let user = await this.getUser({username});
    if(user){
      console.log("user exists");
      return [true,"User Exists"];
    }

    let newuser = await this.userDao.createUser({username,password});
    console.log(newuser);
    return [false,newuser];
  }

}

module.exports.UserService = UserService;
