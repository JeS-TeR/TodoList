/*
  !!!!!NOTICE!!!!!!
  I know this would be easier by creating classes for the user,the tasklist and the tasks, 
  BUT,
  I wanted use the functional programming stye on the front-end, and the object oriented programming style on the back end so bare with me,
  I hope u enjoy either learning from, using or helping with this project... ITs gonna be the best  todolist on the internet one DAY O_O...
*/


/*
  IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANTIMPORTANT IMPORTANT IMPORTANT IMPORTANTIMPORTANT 

  Lots of css styling weaved through code, can't be good, Will have to work on transferring it to css classes, and then toggle classes on and off; If i could have
  a function(one) dedicated to toggling things then that would be amazing...I'm unsure as to how id do that though;
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

/*                                                   User Releate functions                               */
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

  let {user}     = resParams;
 
  //DOM DECLERATIONS
  let loginForm  = document.getElementById('Log_In_Form');
  let O_Cont     = document.getElementById('O_Cont');
  let loginTitle = document.getElementById("title");
 
  //DOM MANIPULATION
  document.getElementsByTagName("body")[0].style.backgroundColor="rgba(154, 12, 255, 0.1)";
  loginTitle.style.display = "none";
  loginForm.style.display = "none";
  O_Cont.style.border = "none";

  //!!!!!!!!!!!!! These are global... not good... need to refactor !!!!!!!!!!!!!!!!!!!!!(Pragmatic Programmer would be disappointed :-/ )
  userId    = user._id;
  userLogin = user.username;

  let TL = populateTL(resParams.user.taskList);
  animateTL(TL);
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





let populateTL = (resParams) =>{
  //really need to make a function that handles all the styling... this isnt orthagonal at all(Pragmatic Programmer...would be disappoineted :/)!!!!!!!!!

  let tlWrapper           = document.getElementById("TLwrapper");
  let tlContainer         = document.getElementById("TLcontainer");
  tlWrapper.style.display = "block";
  let contHeight          = tlWrapper.clientHeight;
  let TL = [];
  resParams.forEach((element,i) => {
    let{_id,tasks,taskListName} = element;
    let x = tlContainer.cloneNode('deep');  
    let taskCount = tasks.length; 
    
    //Implement way of limiting tasks, set count and then reload task each time.... modulate this function...Repeating myself;
    
    if(i==0)
      x.style.marginTop="0px";
    
    Tasks[i] = tasks; //global
    
    x.querySelector(".taskCount").innerHTML = taskCount;
    x.querySelector(".TLname").innerHTML = taskListName;
    
    //Create func for this 
    x.id = ""+_id;
    x.classList.add("TLcontainer");
    x.setAttribute("num",i);
    x.style.display  = "block";
    x.style.position = "relative";
    x.style.top      = contHeight+"px";

    
    args = dateHandler(tasks);
    
    x.querySelector(".due").innerHTML = args[0];
    x.querySelector(".upcoming").innerHTML = args[1];
    tlWrapper.appendChild(x);
    TL.push(x);
  });   
  return TL;
}

let animateTL = (TL) => {
  function changePosition(element){
    element.style.top ="0px";
  }

  TL.forEach((element,i) => {
    setTimeout(changePosition.bind(element), 1000*(i/TL.length),element);
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

//Adds attributes to class dictionary and returns it to laod tasklist;
let dateHandler = (tasks) => {
  let duevariable = 86400;
  let overDue     = 0;
  let upcoming    = 0;
  let today = new Date();
  
  tasks.forEach((task,i)=>{
    let taskDate = new Date(task.dueDate);
    let numDays  = (taskDate - today)/1000;
    
    if(numDays < 0)
      overDue++

    else if( numDays > 0 && numDays <= duevariable)
      upcoming++
    
    console.log(this);
    tasks[i].dueDate = numDays;
    console.log(tasks[i]);
      
  },tasks)
  let args = [overDue,upcoming];
  return args;
}
