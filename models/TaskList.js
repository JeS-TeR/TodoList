const mongoose =  require('mongoose');
const Schema =  mongoose.Schema;

let TaskListSchema = new Schema({
  taskListName : { type  : String, required : true},
  userId       : { type  : mongoose.Schema.Types.ObjectId, ref : 'User', require : true},
  tasks        : [{ type : mongoose.Schema.Types.ObjectId, ref : 'Task'}]
});

const TaskList = mongoose.model("TaskList",TaskListSchema);
module.exports.TaskListSchema = TaskList;
