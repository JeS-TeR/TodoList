/*
  !!!!!NOTICE!!!!!!
  I know this would be easier by creating classes for the user,the tasklist and the tasks, 
  BUT,
  I wanted use the functional programming stye on the front-end, and the object oriented programming style on the back end so bare with me,
  I hope u enjoy either learning from, using or helping with this project... ITs gonna be the best  todolist on the internet one DAY O_O...
*/




//Globals ------BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD
var userId     = "";
var userLogin  = "";
var Tasks   = [];




/* This section is concerned with doing validating the username,and providing real time update*/

let userField = document.getElementsByName("username")[0];
let passwordField  = document.getElementsByName("password")[0];
let messages = {};

//fires validate function on keypress

//img that accompanies validation field
let userimg = document.getElementsByClassName("check");


function validateU_name(e){
  if(userimg[0].src != "images/loading.gif")
    userimg[0].src = "images/loading.gif"
  messages.empty    = validator.isEmpty(this.value)   ? "Can't be empty" : false;
  messages.alpha    = validator.isAlpha(this.value)   ? "Must contain at least 1 number" : false;
  messages.numeric  = validator.isNumeric(this.value) ? "Must contain letters" : false;

  if( !messages.empty && !messages.alpha && !messages.numeric){ 
    userimg[0].src = "images/check.jpg";
   
  }
  else{
    userimg[0].src = "images/x.png";
    console.log("empty: "   + messages.empty);
    console.log("alpha: "   + messages.alpha);
    console.log("numeric: " + messages.numeric);
  }
}



/** PassWord validation section **/
function validatePass(self){
  let messages = {};

  if(Object.entries(messages).length === 0 && messages.constructor === Object){
    return true;
  };
}

// Darken the second field out if the other is not valid.
function comparePass(self){
  messages ={}
  let origPass = document.getElementsByName('password')
  if(origPass.value !== self.value)
    message.different="The Passwords are not the same";
  if(messages.entries(obj).length === 0 && messages.constructor === Object){
      return true;
  };
}

/*                                                   User Releate functiono                               */
/*                                                   User Releate functions                               */
/*                                                   User Releate functions                               */
/*                                                   User Releate functions                               */

let Submit = async (self) => {
  let username = userField.value;
  let password = passwordField.value;
  let credentials = JSON.stringify({username:username,password:password});

  const xhr = new XMLHttpRequest();

    try {
      return new Promise((resolve,reject) =>{
      xhr.open("Post","/Login",true);
      xhr.setRequestHeader("Content-Type","application/json");
      xhr.send(credentials);

      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
           let resParams = JSON.parse(xhr.responseText);
           let {msg} = resParams;
           if(resParams.isValid)
            LogEmIn(resParams);
           else{
            denyAccess(msg);
           }
        }
      }
    })
  }catch(err){throw err}
}

let LogEmIn = async (resParams) => {
  //Refactor all recurring css styling to a stylesheet; and just toggle between classes; -_- this is too tedius
  let loginForm  = document.getElementById('Log_In_Form');
  let O_Cont     = document.getElementById('O_Cont');
  let loginTitle = document.getElementById("title");
  let {user}     = resParams;

  loginTitle.style.display = "none";
  loginForm.style.display = "none";
  O_Cont.style.border = "none";
  //!!!!!!!!!!!!! These are global... not good... need to refactor !!!!!!!!!!!!!!!!!!!!!
  userId    = user._id;
  userLogin = user.username;

  LoadTaskLists(resParams.user.taskList);
}

let denyAccess = (msg) => {
  console.log(msg);
}

let createUser  = (self) => {
  //Could have it that, if users data isn't valid, then they can't login. Can't click submit button.

  //will definately refactor to just toggle css classes.
  let visible        = self.getAttribute("state");
  let createLogin    = document.getElementById("CreateLogin");
  let submit         = document.getElementById("submit");
  let createPara     = document.getElementById("createPara");

  userField.addEventListener("keyup",validateU_name);

  if(!eval(visible)){
    userimg[0].style.visibility = "visible";
    createLogin.style.display ="block";
    submit.style.display = "none";
    createPara.style.display = "none";
    self.state = "true";
    return;
  }

  JSON.stringify({username:username,password:password});
  const xhr = new XMLHttpRequest();

  try{
    return new Promise((resolve,reject) =>{
      xhr.open("POST","/createUser",true);
      xhr.setRequestHeader("Content-type","application/json");
      xhr.send();

      xhr.onreadystatechange = () =>{
        if(xhr.readyState === 4){
        console.log(xhr.responseText);
        }
      }
    })
  }catch(err){throw err}
}

let deleteUser = () => {
  // !!!!!!!!!!let userId = getUserId somehow!!!!!
  const xhr = new XMLHttpRequest();
  try{
    return new Promise((resolve,reject) => {
      xhr.open();
      xhr.setRequestHeader();
      xhr.send(); // would be sending the id(or jwToken(jessie talked about), the server would then erform te delete action).
    })
  }catch(err){throw err}
}


/*                                                   TaskList Releated functions                               */
/*                                                   TaskList Releated functions                               */
/*                                                   TaskList Releated functions                               */
/*                                                   TaskList Releated functions                               */





let LoadTaskLists = (resParams) =>{
  let tlWrapper   = document.getElementById("TLwrapper");
  let tlContainer = document.getElementById("TLcontainer");

  resParams.forEach((element,i) => {
    let{_id,tasks} = element;
    let x = tlContainer.cloneNode('deep');   
    
    Tasks[i] = tasks;
    x.id = "";
    x.classList.add("TLcontainer");
    x.style.display="block";
    x.setAttribute("num",i);
    x.setAttribute("_id",_id);
    console.log(i);
    tlWrapper.appendChild(x);
  });   
  
}



let deleteTaskList = (tl_id) =>{

}

/**                                                    Task Related Functions                                   */
/**                                                    Task Related Functions                                   */
/**                                                    Task Related Functions                                   */
/**                                                    Task Related Functions                                   */

let getTasks = async() => {
  let xhr = new XMLHttpRequest();

}

