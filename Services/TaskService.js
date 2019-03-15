//!TODO: ADD DOCS!

class TaskService {
  constructor (taskDao,TLservice){
    this.taskDao   = taskDao;
    this.TLservice = TLservice;
  }

  async createTask({taskName,content,dueDate,tags,TL_id}){
    console.log(this.taskDao);
    let newTask = await this.taskDao.createTask(taskName,content,dueDate,tags);
    if(!newTask)
      console.log("Task Not created");
    console.log("WE in task services");
    console.log(this.TLservice);
    let added = await this.TLservice.addTask(TL_id,newTask);
    if(!added)
      this.taskDao.deleteTask(newTask._id);
    return newTask;
  }

  async getTaskById({_id}){
    let task =  await this.taskDao.getTaskById(_id);
    return task;
  }

  async deleteTask({_id}){
    let task = await this.taskDao.getTaskById(_id);
    if(!task)
      return false;
    let deletedTask = await this.taskDao.deleteTask(_id);
    return deletedTask;
  }
}

module.exports.TaskService = TaskService;
