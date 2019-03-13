const mongoose = require('mongoose');
const User     = mongoose.model('User');


class UserDao{

  constructor(options = {}) {
        this.options = options
    }
  /**
  Only focues on the creation of new users, does not care about wether user already exists.
  This is handled by the corresponding service.
  The service will get data from the request, specifically the list of arguments sent from client
  From that the service can perform logic like checking if data exits,validation(if done on serverside)
  If everything is good, then the service will call the DOA(it takes it as an argument, so itll have a reference)
  The DOA will then interact with the database.
  **/
  async getUser(username){
    console.log("get users " + username);
    let user = await User.findOne({username:username});
    return user;
  }

  async createUser(username,password){
    let newUser = User({username,password});
    await newUser.save();
    return newUser;
  }

  async deleteUser(){

  }

  async updateUser(){

  }

}


console.log(UserDao);
module.exports.UserDao = UserDao;
