const express  = require('express');
const router   = express.Router();
const mongoose = require("mongoose");

//Each route would require its corresponding DAO and Model.

// Initialize Task Data Access Object
let UserDao = new require ('../DAO/User').UserDao;
let TaskDao = new require ('../DAO/Task').TaskDao;
let TaskListDao =  new require('../DAO/TaskList').TaskListDao;
let userDao =  new UserDao();
let taskDao = new TaskDao();
let taskListDao = new TaskListDao();

//          Initialize Services
let UserService     = require('../Services/UserService').UserService;
let TaskService     = require('../Services/TaskService').TaskService;
let TaskListService = require('../Services/TaskListService').TaskListService;
let userService     = new UserService(userDao);
let taskListService = new TaskListService(taskListDao,userService);
let taskService     = new TaskService(taskDao,taskListService);

/*           GET Page.                                                 */
router.get('/', (req, res, next) => {
  res.render('TodoList',{title:"Get To It"});
});

/*          Routings for User                               */

//Create User, Checks if username already exists
router.post('/createUser', async function(req,res,next){
  let {username,password} = req.body;
  let exists_msg = await userService.newUser({username,password});
  if(exists_msg[0]){
    res.send(exists_msg[1]);
    return;
  }
  res.send(JSON.stringify(exists_msg[1]));
});

router.get('/getUser/:_id', async function(req,res,next){
  let {_id} = req.params;
  console.log(_id);
  let user = await userService.getUserbyId({_id});
  if(!user){
    res.send("User Does Not Exist");
    return;
  }

  res.send(user);
});

router.post('/Login', async (req,res,next)=>{
  let {username,password} = req.body;
  let LoginStatus = await userService.login({username,password});
  let message = "ENTER MY DEAD FRIEND EEEEENNNTEEEERRRR!!!!!!!";
  if(LoginStatus === undefined)
    message = "You my friend do not exist";
  else if(LoginStatus === false)
    message = "Invalid Credentials. Sure u got an account with us fam?";

  res.send(message);
});

router.delete('/delUser/:_id', async (req,res,next)=>{
  console.log("this the delete user router");
  let {_id} = req.params;
  let deletedUser =  await userService.deleteUser({_id});
  if(deletedUser === false){
    res.send("User doesn't exist");
    return;
  }
  else if(deletedUser === null)
    res.send("User Deleted !");
});




/*          Routing for tasks                            */
router.post("/createTask", async (req,res,next) => {
  let {taskName,content,dueDate,tags,TL_id} = req.body;
  let newTask = await taskService.createTask({taskName,content,dueDate,tags,TL_id});
  console.log(newTask);
  res.send(newTask);
});

router.get("/getTask/:_id", async (req,res,next) =>{
  let {_id} = req.params;
  console.log("index: " + _id);
  let task = await taskService.getTaskById({_id});
  console.log(task);
  if(!task){
    res.send("Task Doesn't exist");
    return;
  }
  res.send(task);
});

router.delete("/delTask/:_id", async (req,res,next) =>{
  let {_id} = req.params;
  let deletedTask = await taskService.deleteTask({_id});
  console.log(deletedTask);
  console.log("We in the delete Task Route:" + deletedTask);
  console.log(deletedTask);
  if(deletedTask === false){
    res.send("Task doesn't exist");
    return;
  }
  else if(deletedTask === null)
    res.send("Task Deleted !");
})

/**     Routing for taskList                   **/

router.post("/createTL", async (req,res) =>{
  let {tlName,userId} = req.body;
  console.log(tlName + " "+userId)
  taskList = await taskListService.createTaskList(tlName,userId);
  console.log("we in the index" + taskList);
  res.send(taskList);
})
router.get("/getTL/:_id", async (req,res,next) => {
  let {_id} = req.params;
  let taskList = await taskListService.getTaskList({_id});
  if(!taskList){
    res.send("TaskList No Exists.");
    return;
  }
  res.send(taskList);
})


























/*redirects all faulty requests to login screen*/
router.get("/*",function(req,res,next){
  res.send("The redirct be firing fam");
  res.redirect("/");
});

module.exports = router;
