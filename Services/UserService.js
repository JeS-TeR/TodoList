//!TODO: ADD DOCS!

class UserService {

  constructor(userDao){
    this.userDao = userDao;
  }

async getUserbyId({_id}){
    try{
     let user = await this.userDao.getUserbyId(_id);
     if(!user)
     return false;
     console.log(user);
     return user;
    }catch(e){console.log(e); return false;}

  
}

async login({username,password}){
  let user = await this.userDao.getUser(username);
  console.log("login" + user);
  if(!user)
    return null;

  else if(user.password !== password)
    return false;

    
  // let {_id,username} =  user;
  // let userCred = {_id,username};
  // console.log("what: "+userCred);
  return user;
}
async newUser({username,password}){
    let resParams = {};
    let user      = await this.userDao.getUser(username);
    if(user)
      return resParams = {exists:true,msg:"User Already Exists"};
    
    let newuser = await this.userDao.createUser(username,password);
    console.log(newuser);
    return resParams = {exists:false,msg:"Welcome To The Go-Getting TrendSetters",user:newuser};
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
  return user;
}


// Helper functions
    async getUser({username}){
      let user = await this.userDao.getUser(username);
      return user;
    }
}

module.exports.UserService = UserService;
