let mongoose = require("mongoose");
let Schema = mongoose.Schema;

/*
  Should a list be specific to one user? what if there was a group,
  whose purpose was to collectively handle tasks in a list... but then id have
  to implement groups, which i dont want to implement rn. Nice thinking though!!
*/

let userSchema = new Schema({
  username : {type: String, required: true, unique : true},
  password : {type: String, required:true,},
  taskList : [{type: mongoose.Schema.Types.ObjectId, ref : "TaskList"}]
});

const User = mongoose.model('User',userSchema);
module.exports = User;
