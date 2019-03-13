/* these fuunctions are concerned with validating the  input fields... they will be fire on keydown, and notify the user of what hes missing*/


// All of these variables will trigger when thier respective input fields are clicked on.
// The first two can have an object with messages(invalids). This way i can delete each message once thier resolved.
// if messages are once, mouses out, check one more time to make sure everythings good.
// Only show modal when box is focused; once they click off, the modal goes away, but the border(inset border) will be red.. to show that thier is an error(or i can just have an x)
// delete messages when they're resolved... how?
//modal can be an unordered list, and i delete the list elements, when theyre resolved.

/* This section is concerned with doing validating the username,and providing real time update*/
let userField = document.getElementsByName("username")[0];
let messages = {};

//fires validate function on keypress
userField.addEventListener("keyup",validateU_name);

function validateU_name(e){

  messages.empty    = validator.isEmpty(this.value)   ? "Can't be empty" : false;
  messages.alpha    = validator.isAlpha(this.value)   ? "Must contain at least 1 number" : false;
  messages.numeric  = validator.isNumeric(this.value) ? "Must contain letters" : false
  messages.tooShort = validator.isLength(this.value  ,[{min:6}]) ? "must be more than 5 characters" : false;
  messages.tooLong  = validator.isLength(this.value  ,[{max:12}]) ? "must be less than 12 characters" : false;

  console.log(messages.tooShort);
  console.log(messages.tooLong);

  if( !messages.empty && !messages.alpha && !messages.numeric){
    console.log("empty: "   + messages.empty);
    console.log("alpha: "   + messages.alpha);
    console.log("numeric: " + messages.numeric);
  }
  else{
    console.log("EEEEEEERRRRRRR");
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

/**                            User Releate Requests              **/
let createUser  = () => {
  //Could have it that, if users data isn't valid, then they can't login. Can't click submit button.
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




// json = JSON.stringify({
//   "username":username,
//   "password":password,
//   "password2":password});
//
// postData(json);
