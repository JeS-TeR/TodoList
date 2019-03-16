const mongoose  = require('mongoose');
const TaskList = mongoose.model('TaskList');

class TaskListDao {
  constructor(options = {}){
    this.options = options;
    }

  async createTL(tlName,userId){
    try{

      let taskList =  TaskList({"taskListName":tlName,"userId":userId},(err,tasklist) => {    
         return tasklist;
       });
      taskList.save();
      return taskList;
    }catch(err){return false;}
    
    
  }

  async addTask(TL_id,task){
    let addedTask = TaskList.findById({_id:TL_id}, async (err,result) => {
      result.tasks = [...result.tasks,task];
      await result.save();
    })
    return addedTask;
  }

  async getTaskListById(_id){
    console.log(_id);
    let taskList = TaskList.findById({"_id":_id});
    console.log(taskList); //should be a query;
    return taskList;
  }

  async deleteTL(_id){
    let deletedTaskList = await TaskList.findOneAndDelete({"_id":_id}).exec();

    console.log("This is: "+taskList);
    if(!deletedTaskList)
      return false;
    return true;
  }

  
  
}

module.exports.TaskListDao = TaskListDao;
