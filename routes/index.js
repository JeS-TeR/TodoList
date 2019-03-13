const express  = require('express');
const router   = express.Router();
const mongoose = require("mongoose");

//Each route would require its corresponding DAO and Model.

//Require UserDao
//One liner? Not a bad idea lool
let UserDao = new require ('../DAO/User').UserDao;
userDao =  new UserDao();
let TaskDao = new require ('../DAO/Task').TaskDao;
taskDao = new TaskDao();

//Initialize Services
UserService = require('../Services/UserService').UserService;
userService = new UserService(userDao);

/*          GET Page.                                                 */
router.get('/', (req, res, next) => {
  res.render('TodoList',{title:"Get To It"});
});



/*          Routings Concerned with User                               */

//Gets username. Mainly to check if username already exits
router.post('/createUser', async function(req,res,next){
  let {username,password} = req.body;
  let exists_msg = await userService.newUser({username,password});
  if(exists_msg[0]){
    res.send(exists_msg[1])
    return;
  }
  res.send(JSON.stringify(exists_msg[1]));
});


/*          Routing for task and task lists                            */
router.get('/TodoMain');

router.get("/*",function(req,res,next){
  res.redirect("/");
});

module.exports = router;
