const TaskService = require("./TaskService").TaskService;

//!TODO: ADD DOCS!
class TaskListService extends TaskService {
    constructor(taskListDao,userService,taskDao){
      super(taskDao);
      this.taskListDao = taskListDao;
      this.userService = userService;

    }

    async createTaskList(tlName,userId){
      
      let taskList = await this.taskListDao.createTL(tlName,userId);
      if(!taskList)
        return false;
      let user = await this.userService.addCollection(userId,taskList);
      return taskList;
    }

    async getTaskList({_id}){
      let taskList = await this.taskListDao.getTaskListById(_id);
      return taskList;
    }
    async delTaskList({_id}){
      let taskList = await this.getTaskList({_id});
      
      if(!taskList)
        return false;

      let deletedTasks = await this.taskListDao.deleteTL(_id);
      console.log("length: "+deletedTasks.length);
      for(let i = 0; i < deletedTasks.length; i++){
        let _id = deletedTasks[i]._id;
        console.log("we in for:" + _id);
        await this.taskDao.deleteTask(_id);
      }
      return true;
    }
    async getTasks({_id}){
      let taskList = await this.getTaskList({_id});
      return taskList.tasks;
    }
    async addTask(taskListId,task){
      let gotAdded = await this.taskListDao.addTask(taskListId,task);
      return gotAdded;
    }


}

module.exports.TaskListService = TaskListService;
