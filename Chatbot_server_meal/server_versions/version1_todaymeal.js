const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const logger = require('morgan');
const fs = require('fs');
const moment = require('moment-timezone');
//서버 설정
var app = new express();
app.set('port', process.env.PORT || 3000);
//라우터 설정
const Router = express.Router()
app.use('/', Router);
//로그 설정
app.use(logger('dev', {}));
//body-parser 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//학교 급식
app.post('/', function(req, res){
  //body 받아와서 파라미터 확인 
  var BODY = req.body
  //날짜 받아오기
  var currentDate = new Date();
  var kr = moment(currentDate).tz('Asia/Seoul');
  var sendmessage='요청시각: ' + kr.format('YYYY-MM-DD HH:mm:ss') + '\n\n';
  //date 파라미터 처리
  if (BODY.action.params.date == '내일') currentDate.setDate(currentDate.getDate()+1);
  if (BODY.action.params.date == '어제') currentDate.setDate(currentDate.getDate()-1);
  kr = moment(currentDate).tz('Asia/Seoul');
  var currentMonth = kr.month()+1;//달
  var currentDay = kr.date(); //일
  //요청한 날짜 sendmessage에 추가
  sendmessage+=kr.format('MM-DD') + '\n\n';
  //json 파일 읽어오기
  var textname = currentMonth + '.json';
  fs.readFile(textname, function(err, data){
    if(err) throw err;
    var meal = JSON.parse(data);
    var none = false;
    //요청한 날짜를 맨 위에 적음
    var text = meal[currentDay];
    //각 항목 인덱싱
    var indexarr = [text.indexOf("조식"), text.indexOf("중식"), text.indexOf("석식")];
    //분기별로 sendmessage에 급식 넣어줌
    if(BODY.action.params.meal=="아침"){
      if(indexarr[0]==-1) sendmessage+="조식이 없는 날입니다", none=true;
      else if(indexarr[1]==-1) sendmessage+=text.substring(indexarr[0]-1,);
      else sendmessage+=text.substring(0,indexarr[1]-2);
    }
    else if(BODY.action.params.meal=='점심'){
      if(indexarr[1]==-1) sendmessage+="중식이 없는 날입니다", none=true;
      else if(indexarr[2]==-1) sendmessage+=text.substring(indexarr[1]-1,);
      else sendmessage+=text.substring(indexarr[1]-1,indexarr[2]-2);
    }
    else if(BODY.action.params.meal=='저녁'){
      if(indexarr[2]==-1) sendmessage+="석식이 없는 날입니다", none=true;
      else sendmessage+=sendmessage=text.substring(indexarr[2]-1,);
    }
    else{
      sendmessage+=text;
      if(text.length==0) sendmessage+="급식이 없는 날입니다.", none=true;
    } 
    //마지막으로 알레르기 정보 넣어줌
    if(!none) sendmessage+="\n\n알레르기 정보\n1.난류 2.우유 3.메밀 4.땅콩 5.대두 6.밀 7.고등어 8.게 9.새우 10.돼지고기 11.복숭아 12.토마토 13.아황산류 14.호두 15.닭고기16.쇠고기 17.오징어 18.조개류(굴,전복,홍합 포함)"
    //카카오톡 json 형식
    var responseBody = {
     'version': '2.0',
      'template': {
        'outputs': [
          {
            'simpleText': {
            'text': sendmessage
          }
        }
      ]
      }
    };
    //응답 보내줌
    res.send(responseBody);
  });
});

app.get('/', function(req, response){
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Test server is running...");
});

app.get('/master', function(req, res){
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Server Master's name is SHJ");
})

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server running at http://localhost:%d", app.get('port'));
});

