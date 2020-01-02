# AWS_ELB_LOG_CHART  
elb-log-analyzer 와 google chart를 이용하여 ELB Log를 나타냅니다    
show elb log using google chart      









## Reference  
**Log Analyzer for AWS Elastic Load Balancer**  
https://www.npmjs.com/package/elb-log-analyzer  

**Google Chart**  
https://developers.google.com/chart/      






## Get Started Immediately
test file : **cmd.exe**

cmd.exe를 실행. 브라우저에서 보려면 localhost:3000을 엽니다.  
Runs cmd.exe.  
Open http://localhost:3000 to view it in the browser.  

chart1 : request url  
chart2 : elb_status_code





## Creating An App
**installation**  
```node.js / npm  /  elb-log-analyzer /  express / ejs```  


**elb-log-analyzer**  
```npm install -g elb-log-analyzer```

**express**   
```npm install express```  

**ejs**  
```npm install ejs```


## Run 
```node server.js```  
Open http://localhost:3000 to view it in the browser.  

**log**폴더 안의 로그파일의 결과를 보여줍니다.
Shows the results of the log file in the log folder.  

AWS ELB Log  
https://docs.aws.amazon.com/ko_kr/elasticloadbalancing/latest/classic/access-log-collection.html#access-log-entry-format      

## Usage  
**차트 추가하기**  
**add chart**  
1. server.js 에서 원하는 항목을 명령어로 추가합니다. dataObj 에 필드명을 key로 하여 data를 저장합니다. (날짜를 지정하지 않으면 ? 로 표시됩니다.) 
```elb-log-analyzer log/ --col1=count --col2=원하는 필드```

  ex)

    exec("elb-log-analyzer log/ --col1=count --col2=client:port --col3=elb_status_code", function(err, stdout, stderr){
    dataObj['원하는 필드'] = dataProcessing(stdout)});
        

     
자세한 사용법은 https://www.npmjs.com/package/elb-log-analyzer 를 참고할 수 있습니다.   

2. chart.ejs 에서 차트를 보여줄 영역을 지정합니다.   
ex)  
```<div id="elb_status_code_div" style="width: 1900px; height: 500px;"></div>```   


3. draw 함수를 추가합니다.  
```google.setOnLoadCallback( /*drawFunc*/ )```  

    해당데이터를 dataObj 에서 추출하여 dataTable에 적용합니다.  
google.visualization.arrayToDataTable(dataTable);  


3. 추가하고 싶은 차트를 생성합니다.  
ex)  
```let chart = new google.visualization.ColumnChart(document.getElementById('elb_status_code_div'));```



