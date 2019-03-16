let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let taskSchema =  new Schema({
  taskName    : {type:String  , required:true},
  dueDate     : {type:Date    , required:true},
  content     : {type:String, required:true},
  taskListId  : {type:Schema.Types.ObjectId,ref:"TaskList",require:true},
  tags        : [{type:String}]
},{timestamps:true});

//Make it a CONSTANT so that it can't be changed in other files?
//Couldn't I also use let?

const Task = mongoose.model('Task',taskSchema);
module.exports= Task;
