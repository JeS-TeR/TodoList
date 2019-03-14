class UserService {

  constructor(userDao){
    this.userDao = userDao;
  }

async getUserbyId({_id}){
  let user = {}
    try{
     user = await this.userDao.getUserbyId(_id);
  }catch(e){console.log(e); return false;}

  if(!user)
    return false;
  return user;
}

async login({username,password}){
  let user = await this.userDao.getUser(username);
  console.log("login" + user);
  if(!user)
    return undefined;
  
  else if(user.password !== password);
    return false;
  
  return true;
}
async newUser({username,password}){
    let user = await this.userDao.getUser(username);
    if(user){
      console.log("user exists");
      return [true,"User Already Exists"];
    }
    let newuser = await this.userDao.createUser(username,password);
    console.log(newuser);
    return [false,newuser];
}

async deleteUser({_id}){
  let user = await this.getUserbyId({_id});
  if(!user)
    return false;
  let deletedUser = await this.userDao.deleteUser(_id);
  return deletedUser;
}

async addCollection(userId,taskList){
  console.log("add "+userId);
  let user = await this.userDao.addCollection(userId,taskList);
  console.log("US.AddCollec" + user);
  return user;
}


// Helper functions
    async getUser({username}){
      return user;
      let user = await this.userDao.getUser(username);
    }
}

module.exports.UserService = UserService;
