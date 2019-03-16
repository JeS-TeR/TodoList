let mongoose = require("mongoose");
let Task = mongoose.model('Task');

class TaskDao {

  // to create a task i must have access to the the variables that the task schema/model takes, I would
  // get these from the service, and the service would get these through the request(or somewhere between the request and the service;
  async createTask(taskName,content,dueDate,TL_id,tags){
    let newTask = Task({"taskName":taskName,"content":content,"dueDate":dueDate,"taskListId":TL_id,"tags":tags});
    newTask.save();
    return newTask;
  }

  async getTaskById(taskId){
    console.log("We in the dao:" + taskId);
    let task = Task.findById({_id:taskId})
    return task;
  }

  async update({taskId,content,dueDate,tags}){

  }
  //Deletes task object, returned object is likely a boolean as to wether it was successful or nah
  //If i had to delete alot id just need to loop ove the entire taskid's and delete each findOneAndDelete
  //Unless a Model object allows me to do this... will update once i find out.

  //How would i update the tags? would If a tag is deleted or added?
  //Use the
  async deleteTask(_id){
    console.log("we in the taskDao" +_id);
    let deletedTask = Task.findOneAndDelete({"_id":_id})
    console.log("THIS GOT DELETED: "+deletedTask);
    return deletedTask;
  }

}

module.exports.TaskDao = TaskDao;
