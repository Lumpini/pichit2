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


   var checktime = "https://script.google.com/macros/s/AKfycbxZ4_XfKROefcqvh1wzT0xvEu2_DW-jJ5RaG1JeAlPLN2MTXEc/exec?userId="+sende_r+"&beaconid="+beacon_id;
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
        
          if(beacon_id == "0133a0751f"){
         var msg = {
           "type": "text",
           "text": "ขณะนี้คุณ"+" " +name +" " + "กำลังอยู่บริเวณประตู 1 (ด้านถนนวิทยุ) ของสวนลุมพินี" +
                    "\n"+
                    "\n\tหาก"+" " +name +" " + "กำลังเดินทางเข้าเยี่ยมชมงาน เมื่อเดินตรงไปถึงทางแยก หากท่านเดินตรงไปจะพบกับซุ้มของหน่วยงานราชการต่าง ๆ  หากเลี้ยวซ้ายจะไปพบกับซุ้มอาหารมากมายจากทุกภาคทั่วประเทศไทย" +
                    "\n"+
                    "\n\tหาก"+" " +name +" " + "กำลังเดินทางออกจากงาน ทางออกนี้จะนำท่านไปสู้ถนนวิทยุ หากขึ้นรถฝั่งนี้สามารถเดินทางไปถนนสุขุมวิทได้ หรือสถานีรถไฟฟ้าเพลินจิต หากต้องการขึ้นรถประจำทางเมื่อเดินออกจากประตูให้เดินไปทางขวา หากท่านข้ามสะพานลอยไปขึ้นรถอีกฝั่งสามารถเดินทางไปยังถนนพระราม 4 และสถานีรถไฟฟ้าใต้ดินลุมพินีได้" +
                    "\n"+ 
                     "\nข้อควรระวัง เนื่องจากมีผู้เข้ามเยี่ยมชมงานเป็นจำนวนมาก อาจมีมิจฉาชีพแฝงตัวมาก่อเหตุล้วงกระเป๋า ขอให้ท่านโปรดระวังทรัพย์สินของท่านให้รัดกุมมากยิ่งขึ้น แนะนำให้ท่านสะพายกระเป๋าไว้ด้านหน้าของท่านตลอดเวลา หากท่านได้รับข้อความการแจ้งเตือนนี้บ่อยเกินไป สามารถหยุดรับข้อความได้ชั่วคราวด้วยการตั้งค่าปิดการรับสัญญาณบลูทูธในโทรศัพท์มือถือของท่าน" +
                    "\n"+ 
                    "\nด้วยความปราถนาดี"+ 
                    "\nจาก พ.ต.อ.กัมพล รัตนประทีป"+ 
                    "\nผู้กำกับการ สถานีตำรวจนครบาลลุมพินี"

          }; 
        reply(reToken, msg, sende_r, beacon_id);    
         }else if(beacon_id == "0133a097a3"){
         var msg = {
           "type": "text",
           "text": "ระบบได้บันทึกข้อมูลของคุณ "+ name + "\nเรียบร้อยแล้ว\n Beacon 2"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }
         
        else if(beacon_id == "01344237f6"){
         var msg = {
           "type": "text",
           "text": "ระบบได้บันทึกข้อมูลของคุณ "+ name + "\nเรียบร้อยแล้ว\n Beacon 3"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }
        else if(beacon_id == "013446ebd9"){
         var msg = {
           "type": "text",
           "text": "ระบบได้บันทึกข้อมูลของคุณ "+ name + "\nเรียบร้อยแล้ว\n Beacon 4"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }
        else if(beacon_id == "013448341c"){
         var msg = {
           "type": "text",
           "text": "ระบบได้บันทึกข้อมูลของคุณ "+ name + "\nเรียบร้อยแล้ว\n Beacon 5"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }
        else if(beacon_id == "01344ad82f"){
         var msg = {
           "type": "text",
           "text": "ระบบได้บันทึกข้อมูลของคุณ "+ name + "\nเรียบร้อยแล้ว\n Beacon 6"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }
        else if(beacon_id == "01344c9149"){
         var msg = {
           "type": "text",
           "text": "ระบบได้บันทึกข้อมูลของคุณ "+ name + "\nเรียบร้อยแล้ว\n Beacon 7"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }
        else if(beacon_id == "01344cdece"){
         var msg = {
           "type": "text",
           "text": "ระบบได้บันทึกข้อมูลของคุณ "+ name + "\nเรียบร้อยแล้ว\n Beacon 8"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }
        else if(beacon_id == "01344dc086"){
         var msg = {
           "type": "text",
           "text": "ระบบได้บันทึกข้อมูลของคุณ "+ name + "\nเรียบร้อยแล้ว\n Beacon 9"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }
        else if(beacon_id == "01344eddf8"){
         var msg = {
           "type": "text",
           "text": "ระบบได้บันทึกข้อมูลของคุณ "+ name + "\nเรียบร้อยแล้ว\n Beacon 10"
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

