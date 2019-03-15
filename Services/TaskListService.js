//!TODO: ADD DOCS!
class TaskListService{
    constructor(taskListDao,userService){
      this.taskListDao = taskListDao;
      this.userService = userService;
    }

    async createTaskList(tlName,userId){
      console.log("bruvs jumping hoops");
      console.log(userId)
      let taskList = await this.taskListDao.createTL(tlName,userId);
      console.log("ctl: "+taskList);
      if(!taskList){
        console.log("not created");
        return false;
      }
      let user = await this.userService.addCollection(userId,taskList);
      console.log("CTLS" + user);
      return taskList;
    }

    async getTaskList({_id}){
      console.log(_id);
      let taskList = await this.taskListDao.getTaskListById(_id);
      return taskList;
    }
    async delTaskList({_id}){
      let taskList = this.getTaskList({_id});
      if(!taskList)
        return false;
      let deletedTaskList = this.taskListDao.deleteTL(_id);
      return deletedTaskList;
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
