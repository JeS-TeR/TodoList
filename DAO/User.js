const mongoose = require('mongoose');
const User     = mongoose.model('User');


class UserDao{

  constructor(options = {}) {
        this.options = options
    }
 
  async getUserbyId(_id){
    console.log("userDAO"+_id);
    let user = await User.findById({_id:_id},(err,result)=>{
      if(err)
       return false;
    });
    return user;
  }
  async getUser(username){
    let user = User.findOne({username:username});

    user.
    populate({
      select:"_id taskListName createdAt",
      path:'taskList',
      populate:{
        select:"-__V -_updatedAt",
        "path":"tasks"
      }
    }).exec();
    console.log(user);
    return user;
  }

  async createUser(username,password){
    console.log("We in create user:" + username);
    let newUser = User({"username":username,"password":password});
    await newUser.save();
    return newUser;
  }

  async deleteUser(_id){
    let deletedUser = User.findOneAndDelete({"_id":_id});
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
