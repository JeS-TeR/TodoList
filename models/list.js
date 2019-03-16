let mongoose = require("mongoose");
let Schema =  mongoose.Schema;

//Used let instead of const, Whats the difference between the two.

// schema constructor takes a list multiple objects as arg.
let listSchema =  new Schema({
  ListName    : {title : String,required : true},
  ref         : {type  : Schema.Types.User, required:true}
},{timestamps :true});


const List = mongoose.model("List",listSchema);

module.export = List;
