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
client.fetch(
    "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%86%A1%EB%8F%84+%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80&oquery=%EC%9D%B8%EC%B2%9C%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80&tqi=UUu0dwprvTVsstspvMGssssssvN-008570"
    ,{}
    ,(err, $, res, body)=>{
        var Classes = $("div.main_box.expand").find(".air_detail").children();
        let List = new Array();
        List.push(($(Classes[0]).find(".state_info")).text());
        List.push(($(Classes[0]).find(".weather")).text());
        List.push(($(Classes[2]).find(".state_list")).text());
        console.log(List[0]);
        console.log(List[1]);
        console.log(List[2]);
    }
);

