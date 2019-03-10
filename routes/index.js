var express = require('express');
var router = express.Router();
/* GET home page. */
console.log(database);
router.get('/', function(req, res, next) {
  res.render('login',{title:"Get To It"});
});

router.post('/verify', function(req,res,next){
  database.connect(function(err){
    //console.log(err);
    let db  = database.db("TodoDB");
    credCollec = db.collection("credentials");
    console.log(req.body);
    credCollec.findOne({"username":req.body.username}, (err,result) => {
      console.log(result);
      if(result === null){
        res.StatusCode=204;

        res.send(false);
      }
      else{
        res.StatusCode=204;

      res.send(true);
      }
    });
  })
})

router.post('/CreateLogin',function(req,res,next){
  database.connect(function(err){
    let db = database.db("TodoDB");
    credCollec = db.collection("credentials");
    credCollec.insertOne(req.body);
  })
})
// router.post()
router.get("/*",function(req,res,next){
  res.redirect("/");
})
module.exports = router;
