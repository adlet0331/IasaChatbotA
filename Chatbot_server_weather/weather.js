const CheerioJttpcli = require('cheerio-httpcli');
const http = require('http');
const express = require('express');
//서버 설정
var app = new express();
app.set('port', process.env.PORT || 3000);
//라우터 설정
const Router = express.Router()
app.use('/', Router);
//송도 미세먼지
app.post('/', function(req, response){
  CheerioJttpcli.fetch(
        "https://www.google.com/search"
        ,{q:"인천광역시 연수구 송도동 미세먼지"}
        ,(err, $, res, body)=>{
            var restring;
            let Lista = $("div.uRiMSd").find(".ha9jJe.gsrt");
            //console.log($(Lista[0]).text());
            let Listb = $("div.gMZXLc").find(".dGcunf.gsrt");
            //console.log($(Listb[0]).text());
            let Listc = $("div.gMZXLc").find(".HV2uTe");
            //console.log($(Listc[0]).text());
            let Listd = $("div.gMZXLc").find(".KWR2de").find(".dm5I5c").find(".uULQNc");
            //console.log($(Listd[0]).text(), '㎍/㎥');
            let Liste = $("div.gMZXLc").find(".Us3eld");
            //console.log($(Liste[0]).text());
            restring = $(Lista[0]).text()+"\n미세먼지 오염정도: "+$(Listb[0]).text()+"\n"+$(Listc[0]).text()+"\n미세먼지 농도: "+$(Listd[0]).text()+"㎍/㎥\n\n"+$(Liste[0]).text()+"\n\n아침에 미세먼지 오염 정도가 한국기준 100㎍/㎥, WHO기준 50㎍/㎥ 이상이면 운동장 점호를 하지 않습니다.";
            var responseBody = {
                'version': '2.0',
                 'template': {
                   'outputs': [
                     {
                       'simpleText': {
                       'text': restring
                     }
                   }
                ]
                }
            };
            response.send(responseBody);
        }
    );
});

app.get('/', function(req, response){
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Test server is running...");
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server running at http://localhost:%d", app.get('port'));
});
