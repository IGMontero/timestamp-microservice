var express = require('express');
var app = express();

function isNumber(str){
  return str.match(/^[0-9]+$/);
}

function dateToString(date){
  var locale = 'en-us',
      month = date.toLocaleString(locale, {month:'long'});
  
  return month + " " +date.getDate()+", "+date.getFullYear();
  
}

app.get("/:url",function(req,res){
  var url = req.params.url;
  
  var date = new Date(url);
  
  //Check type
  
  if(isNumber(url)){
    
      date = new Date(url*1000);
      res.send({
         unix:url,
         natural: dateToString(date)
       })
     }
  
  if(Date.parse(date)){
    res.send({
      unix:Date.parse(date)/1000,
      natural: url
    })    
  }
  
  res.send({ unix:null,natural:null});
  
  
  
});



app.get("*",function(req,res){
  res.send({ unix:null,natural:null });  
});



app.listen(process.env.PORT);
