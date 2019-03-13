let mongoose = require("mongoose");
let Task = mongoose.model('Task');

class TaskDao {

  // to create a task i must have access to the the variables that the task schema/model takes, I would
  // get these from the service, and the service would get these through the request(or somewhere between the request and the service;
  async createTask({taskName,dueDate,tags}){
    let newTask = Task({taskName,content,dueDate,tags});
    newTask.save();
    return newTask;
  }

  async update({taskId,content,dueDate,tags}){

  }
  //Deletes task object, returned object is likely a boolean as to wether it was successful or nah
  //If i had to delete alot id just need to loop ove the entire taskid's and delete each findOneAndDelete
  //Unless a Model object allows me to do this... will update once i find out.

  //How would i update the tags? would If a tag is deleted or added?
  //Use the
  async deleteTask(taskId){
    return Task.findOneAndDelete(taskId);
  }


}

module.exports.TaskDao = TaskDao;
