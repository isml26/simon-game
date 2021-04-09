const express = require("express");
const app = express();

app.use(express.static(__dirname+"/public"));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
  });

  
const PORT = process.env.PORT||3000;
app.listen(PORT,function(){
  console.log("Server is running on port 3000");
});