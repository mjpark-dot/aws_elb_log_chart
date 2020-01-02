let exec = require('child_process').exec;
let data ='',  start='', end ='';
let dataObj = {};
let startDate = '?', endDate='?';
if(process.argv[2]){
    startDate = process.argv[2];
    start = "--start="+ startDate;
}
if(process.argv[3]){
    endDate = process.argv[3];
    end = " --end="+endDate;
}

//1. request, count
exec("elb-log-analyzer log/ "+start+end, function(err, stdout, stderr){
   dataObj['request'] = dataProcessing(stdout);
});

//2. elb_status_code, backend_status_code, count
exec("elb-log-analyzer log/ --col1=count --col2=client:port --col3=elb_status_code", function(err, stdout, stderr){
    dataObj['elb_status_code'] = dataProcessing(stdout);
});




function dataProcessing(data){
    /* 결과값
    1 - 457 - http://www.skmagic.com:80/_ui/shared/js/analyticsmediator.js
    2 - 455 - http://www.skmagic.com:80/eventExhibition/event?uid=gEv2017k03
    3 - 441 - http://www.skmagic.com:80/_ui/mobile/common/css/colorbox.css
     ...
     * 
     * ANSI_WHITE = '\u001b[37m';
     * ANSI_RED = "\u001b[31m"
     * ANSI_GREEN = "\u001b[32m";
     * ANSI_DEFAULT = "\u001b[39m";
    '\u001b[37m1\u001b[39m - \u001b[31m457\u001b[39m\u001b[37m - \u001b[39m\u001b[32mhttp://www.skmagic.com:80/_ui/shared/js/analyticsmediator.js\u001b[39m',
    */

    let newData = data.split('\n');
    for(let i=0; i < newData.length; i++){
        newData[i] = newData[i].replace(/\u001b\[37m|\u001b\[31m|\u001b\[32m|\u001b\[33m|\u001b\[39m|\s/gi , '');
    }
    return newData;
}



//load html
let fs = require('fs');                 //파일 로드 사용
let express = require('express');       //웹 서버 사용
let app = express();
let port = 3000;
let ejs = require('ejs');               //html 타입 템플릿


app.set("view engine", 'ejs');          //express의 view engine에 ejs를 set
app.set('chart', '');

app.listen(port, function(){
    console.log('Server Start, Port : ', port);    
});


//query를 통해서 이름을 받는 코드입니다. 모든 query들은 req.query에 저장됩니다.
app.get('/', function(req, res){
    res.render('chart', {dataObj: dataObj , startDate: startDate, endDate: endDate });
});

