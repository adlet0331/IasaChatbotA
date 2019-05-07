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
    "https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EC%9D%B8%EC%B2%9C%EA%B4%91%EC%97%AD%EC%8B%9C+%EC%97%B0%EC%88%98%EA%B5%AC+%EC%86%A1%EB%8F%842%EB%8F%99+%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80"
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

