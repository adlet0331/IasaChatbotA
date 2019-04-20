const client = require('cheerio-httpcli');
const http = require('http');
const express = require('express');
//서버 설정
var app = new express();
app.set('port', process.env.PORT || 3000);
//라우터 설정
const Router = express.Router();
app.use('/', Router);
//송도 미세먼지
app.post('/', function(request, response){
    client.fetch(
        "https://www.google.com/search"
        ,{q:"인천광역시 연수구 송도동 미세먼지"}
        ,(err, $, res, body)=>{
            if(err){
                response.send('error!');
            }
            else{
                response.send(body);
            }
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

