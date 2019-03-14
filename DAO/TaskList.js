const mongoose  = require('mongoose');
const TaskList = mongoose.model('TaskList');

class TaskListDao {
  constructor(options = {}){
    this.options = options;
    }

  async createTL(tlName,userId){
    let taskList =  TaskList({"taskListName":tlName,"userId":userId},(err,tasklist) => {
    
    tasklList.save();
    console.log("eiow" + tasklist);
    return tasklist;
    });
    taskList.save();
    return taskList;
  }

  async addTask(TL_id,task){
    let addedTask = TaskList.findById({_id:TL_id}, async (err,result) => {
      result.tasks = [...result.tasks,task];
      await result.save();
      return result;
    })
    return addedTask;
  }

  async getTaskListById(_id){
    console.log(_id);
    let taskList = TaskList.findById({"_id":_id},(err,result) => {
      if(err)
        return false
      return result;
    });
    return taskList;
  }

  async deleteTL(_id){
    let deletedTaskList = TaskList.findOneAndDelete({"_id":_id}, (err,taskList) => {
      if(err)
        return false;
      return deletedTaskList //should be null;
    });
  }
  
}

module.exports.TaskListDao = TaskListDao;
