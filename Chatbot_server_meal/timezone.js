var moment = require('moment-timezone');

var date = new Date();
var kr = moment(date).tz('Asia/Seoul');

var currentdate = kr.month();

console.log(date);
console.log(kr);
console.log(currentdate)