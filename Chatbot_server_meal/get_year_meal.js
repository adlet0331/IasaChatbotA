//1년치 급식 한꺼번에 json 파일로 만들어주기 
//1년에 한번만 업데이트해주면 됨

var School = require('node-school-kr');
var fs = require('fs');

var year=2019
var month=[4,5];

const school = new School();
school.init(School.Type.HIGH, School.Region.INCHEON, 'E100002238');

var i; 
for(i=0; i<month.length;i++){
    school.getMeal(year, month[i]).then(meal => {
        var txtname= meal.month + 'month.json';
        var stringJson = JSON.stringify(meal);
        fs.writeFileSync(txtname, stringJson, 'utf8');
        console.log('File is saved at ' + txtname);
    });
}
