//This is how u do xml request.... GET
// function Ajax(){
//   console.log("yoski broski");
//   const xhr = new XMLHttpRequest();
//   console.log(xhr.readyState);
//   xhr.onreadystatechange = function(){
//     console.log(xhr.readyState);
//     if(xhr.readyState== 4){
//       if(xhr.status === 200){
//         console.log("guichi brah");
//         console.log(xhr.responseText);
//       }
//       else if( xhr.status === 404){
//         console.log("bruv idk what u waaaaant");
//       }
//       else if( xhr.status === 302){
//         console.log("talk to me fam, we good?");
//       }
//     }
//   }
//   xhr.open("get",'./login.html',true);
//   xhr.send();
// }

//Posts username and password if everything is guichi;
let postData = function(loginData){

  const xhr = new XMLHttpRequest();
  xhr.open("POST","/CreateLogin",true);
  console.log("yo");
  xhr.setRequestHeader("Content-type","application/json");
  xhr.send(loginData);
}

//Checks if name already exists
let checkUserName =  (username) => {
  let exists = false;
  const xhr = new XMLHttpRequest();
  try{
    // Promises are so fking ugly
    return new Promise((resolve,reject)=>{
      //Open ajax request
      xhr.open("POST","/verify",true);
      xhr.setRequestHeader("Content-type","application/json");
      username = JSON.stringify({"username":username});
      xhr.send(username);

      //Onreadystate event must be in this scope...still looking into why
      xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
              console.log(xhr.responseText);
              if(eval(xhr.responseText)){
                console.log("Unlucky, Seems it already exists");
                exists = true;
                return resolve(exists);
              }
              resolve(exists)
          }
       }
    })
  }
  catch(err){throw err}
}

let validUsername = (username) => {

}
let validatePassword = (password) =>{

}

let checkEquality = (password1,password2) =>{
  if(password1 == password2) return true;
}

let comparePassword=(original,repeated) => {
  if(original == repeated){
     return true;
  }
}

const submit = async () =>{
  var username = document.getElementsByName("username")[0].value;
  var password = document.getElementsByName("password")[0].value;
  var password2 = document.getElementsByName("password")[1].value;



  let exists = await checkUserName(username);

  if(!checkEquality(password,password2)){
    console.log("Passwords dont match");
  }
  if(exists){
    console.log("Name Taken");
    return;
  }

  //WE IN THE CLEAR BABY.... TIME TO MAKE THIS ACCOUNT... OH PASSWORDS;

  json = JSON.stringify({
    "username":username,
    "password":password,
    "password2":password});
  postData(json);
}
