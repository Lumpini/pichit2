'use strict'

const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
const app = express();
var encoding = require("encoding");



app.set('port', (process.env.PORT || 5000)) 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
var Token = process.env.TOKEN;
//var WebDF = process.env.WebDF;

var access_token = 'Bearer {'+Token+'}'
var name = "";

app.get('/', (req, res) => {
  res.end("ok")
})



app.post('/webhook', (req, res) => {

    var data = req.body; 
console.log('-----ปริ้นทั้งหมด-----' + JSON.stringify(data));
    
//console.log('++++'+JSON.stringify(req.body.events));
    
    var sende_r = req.body.events[0].source.userId
    var reToken = req.body.events[0].replyToken
    
    var data = req.body; 
    
    if (req.body.events[0].type == "message") { 
    if (req.body.events[0].message.type == "text") {
     
     var tex_t = req.body.events[0].message.text
     
        //profile(reToken, sende_r); 
     
     postToDialogflow(req);

     }
        
     }else if (req.body.events[0].type == "beacon") {  
     if (req.body.events[0].beacon.type == "enter") {   
        
     var beacon_id = req.body.events[0].beacon.hwid  
       //  if(beacon_1 == "0133a0751f"){
       //  profile(reToken, sende_r);    
       //  }else if(beacon_1 == "0133a0751f"){
       //  profile(reToken, sende_r);    
       //  } 
       profile(reToken, sende_r, beacon_id);  
       console.log("---enter---" + sende_r+"-------"+beacon_id);  
     }
 }
 
 
 })
 
 
 /////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


function data_enter(sende_r, beacon_id) {


   var checktime = "https://script.google.com/macros/s/AKfycbxrGujmpHZjFFl_wY--V5g_lcXjaRRk46FtHKMH4W8H9kSYdsE/exec?userId="+sende_r+"&beaconid="+beacon_id;
 request(checktime, function (error, response, body) {

})


}





// เช็คโปรไฟล์
/////////////////////////////////////////////////////////////////////////

function profile(reToken,sende_r, beacon_id) {

    var headers = {
       'Authorization' : access_token
}
    

var options = {
    url: 'https://api.line.me/v2/bot/profile/'+sende_r,
    method: 'GET',
    headers: headers,
    }

 request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        name = info.displayName;
       
      
        
          if(beacon_id == "014d3dfcc9"){
         var msg = {
           "type": "text",
           "text": "เมืองทราบ"+" " +name +" " + "ว.10 ทางเข้าป้อมยาม วัดท่าหลวง"
          
                   
          }; 
        reply(reToken, msg, sende_r, beacon_id);    
         }else if(beacon_id == "014d456b49"){
         var msg = {
           "type": "text",
           "text": "เมืองทราบ"+" " +name +" " + "ว.10 ทางเข้ากฏิ วัดท่าหลวง"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }else if(beacon_id == "014d45e520"){
         var msg = {
           "type": "text",
           "text": "เมืองทราบ"+" " +name +" " + "ว.10 ทางเข้าฝั่งไปรษณีย์ วัดท่าหลวง"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }else if(beacon_id == "014d460cf0"){
         var msg = {
           "type": "text",
           "text": "เมืองทราบ"+" " +name +" " + "ว.10 ป้อมยามหน้าสำนักงานโยธาธิการ หน้าบึงสีไฟ"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }else if(beacon_id == "014d484009"){
         var msg = {
           "type": "text",
           "text": "เมืองทราบ"+" " +name +" " + "ว.10 ห้างทองอู่ทอง"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }else if(beacon_id == "014d4894f6"){
         var msg = {
           "type": "text",
           "text": "เมืองทราบ"+" " +name +" " + "ว.10 ห้างทองแม่ทองบาง 5"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }else if(beacon_id == "014d4f61a6"){
         var msg = {
           "type": "text",
           "text": "เมืองทราบ"+" " +name +" " + "ว.10 ห้างทองแม่เลี่ยม"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }else if(beacon_id == "014d5624ac"){
         var msg = {
           "type": "text",
           "text": "เมืองทราบ"+" " +name +" " + "ว.10 ห้างทองตั้งเซียมเฮง"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }else if(beacon_id == "014d578804"){
         var msg = {
           "type": "text",
           "text": "เมืองทราบ"+" " +name +" " + "ว.10 ธนาคารทหารไทย"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }else if(beacon_id == "014d60df9a"){
         var msg = {
           "type": "text",
           "text": "เมืองทราบ"+" " +name +" " + "ว.10 ธนาคารเพื่อการเกษตรและสหกรณ์"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }
         
        
        
        
    }
 })


}

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


function reply(reToken, msg, sende_r, beacon_id) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': access_token
    }
    let body = JSON.stringify({
        replyToken: reToken,
        messages: [msg]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }
)
    console.log("---data_enter---" + sende_r+"-------"+beacon_id);
data_enter(sende_r, beacon_id);
}

const postToDialogflow = req => {
    
  var WebDF = "https://bots.dialogflow.com/line/9c6a1598-acdd-4693-929d-29ccb36a541f/webhook";
  req.headers.host = "bots.dialogflow.com";
  return request({
    method: "POST",
    uri: WebDF ,
    headers: req.headers,
    body: JSON.stringify(req.body)
    
  });
 
};

