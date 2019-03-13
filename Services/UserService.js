class UserService {

  constructor(userDao){
    this.userDao = userDao;
  }


  async getUser({username,_id}){

  }
// Helper function, could do it in one function but im trying to get in the habit.
  async newUser({username,password}){
    if(await this.checkName(username)){
      console.log("user exists");
      return [true,"User Exists"];
    }
    console.log("guess it doesnt exist");
    let newuser = await this.userDao.createUser(username,password);
    console.log(newuser);
    return [false,newuser];
  }

  async checkName(username){
    console.log("check name" + username);
    let user = await this.userDao.getUser(username);
    if(!user)
      return false;
    return true;
  }

}

module.exports.UserService = UserService;
