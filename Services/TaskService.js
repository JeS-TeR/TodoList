//!TODO: ADD DOCS!

class TaskService {
  constructor (taskDao,TLservice){
    this.taskDao   = taskDao;
    this.TLservice = TLservice;
  }

  async createTask({taskName,content,dueDate,tags,TL_id}){
    let _id = TL_id;

    let TL = await this.TLservice.getTaskList({_id});
    if(!TL)
      return;
    let newTask = await this.taskDao.createTask(taskName,content,dueDate,TL_id,tags);
    if(!newTask)
      return false
    await this.TLservice.addTask(TL_id,newTask);
    return newTask;
  }

  async getTaskById({_id}){
    let task =  await this.taskDao.getTaskById(_id);
    console.log("this the taskService:"+task);
    return task;
  }

  async deleteTask(_id){
    console.log("IN deleted task TaskServ:" +_id);
    console.log(this.taskDao);
    let task = await this.taskDao.getTaskById(_id);
    console.log("Firing from extended");
    if(!task)
      return false;
    let deletedTask = await this.taskDao.deleteTask({_id});
    return deletedTask;
  }
}

module.exports.TaskService = TaskService;
