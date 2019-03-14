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
  async getUserbyId(_id){
    console.log("userDAO"+_id);
    let user = await User.findById({_id:_id},"username password",(err,result)=>{
      if(err)
       return false;
    });
    return user;
  }
  async getUser(username){
    let user = User.findOne({username:username},"username password",(err,result)=>{
      if(err)
        return false;
      return result;
    });
    return user;
  }

  async createUser(username,password){
    console.log("We in create user:" + username);
    let newUser = User({"username":username,"password":password});
    await newUser.save();
    return newUser;
  }

  async deleteUser(_id){
    console.log("we in the deleteUser-DAO: " +_id);
    let deletedUser = User.findOneAndDelete({"_id":_id},(err,result)=>{
      if(err)
        return false;
      return result;
    });
    console.log("we ub daoo:use" + deletedUser);
    return deletedUser;
  }

  async updateUser(){

  }

  async addCollection(userId,taskList){
      let user = await User.findById({_id:userId}, async (err,result)=>{
      console.log("result"+result);
      console.log("tl"+taskList);
      result.taskList = [...result.taskList,taskList];
      await result.save();
      return result;
    });
    console.log("USer is :" + user);
    return user;
  }
}


console.log(UserDao);
module.exports.UserDao = UserDao;
