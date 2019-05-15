var moment = require('moment-timezone');
var School = require('node-school-kr'); //today에 오늘의 급식이 들어가는게 원래 것인데 그걸 뺌. 상관 없긴 함
var fs = require('fs');

var CurrentDate = new Date();
var kr = moment(CurrentDate).tz('Asia/Seoul');

var year=kr.year();
var month=[kr.month()+1];
var currentDate = new Date();
currentDate.setDate(currentDate.getDate());
var Month = kr.month()+1;
if (kr.date()>=23){
    month.pushn(Month+2);
}
if (kr.date()==1){
    month.push(Month);
}

const school = new School();
school.init(School.Type.HIGH, School.Region.INCHEON, 'E100002238');

var i; 
for(i=0; i<month.length;i++){
    school.getMeal(year, month[i]).then(meal => {
        var txtname= meal.month + '.json';
        var stringJson = JSON.stringify(meal);
        fs.writeFileSync(txtname, stringJson, 'utf8');
        console.log('File is saved at ' + txtname);
    });
}
