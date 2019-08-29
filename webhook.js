var express = require('express');
var router = express.Router();
var linebot = require('linebot');
var request = require('request');
//氣象密碼Ken@92021029948290
//授權碼CWB-24BEA5F2-97E9-4CC9-8397-86C471D270AC
var bot = linebot({
    channelId:'1609824318',
    channelSecret:'ee485414887deff0d5b4768340e60477',
    channelAccessToken:'OqJ3R4uUc4zpkpH+pUUYvaQ5g8R7hxn946fsChFrTeJYy8MFGhEfV+t/Y+fPgiX1hl+5rsP3sZQUoAm40pbPuhu51o8I/fjohkdnjqmyA0Psgof5264pOBERsbGlUgLJdXZHCf+CXbL9bB4tL7u36gdB04t89/1O/w1cDnyilFU='
});

var message = {
        "type": "template",
        "altText": "template",
        "template": {
            "type": "carousel",
            "columns": [
                {
                  "thumbnailImageUrl": "https://blog.myroomabroad.com/wp-content/uploads/2019/03/rainy-day-taipei.jpg",
                  "imageBackgroundColor": "#FFFFFF",
                  "title": "新北市",
                  "text": "不是不報,時候未到",
                  "defaultAction": {
                      "type": "uri",
                      "label": "View detail",
                      "uri": "http://example.com/page/123"
                  },
                  "actions": [
                    {
                        "type":"message",
                        "label":"新莊區",
                        "text": "新莊區"
                    },
                    {
                        "type":"message",
                        "label":"板橋區",
                        "text": "板橋區"
                    },
                    {
                        "type":"message",
                        "label":"中和區",
                        "text": "中和區"
                    }
                  ]
                },
                {
                  "thumbnailImageUrl": "https://i.imgur.com/PQt2ECz.jpg",
                  "imageBackgroundColor": "#000000",
                  "title": "台北市",
                  "text": "不是不報,時候未到",
                  "defaultAction": {
                      "type": "uri",
                      "label": "View detail",
                      "uri": "http://example.com/page/222"
                  },
                  "actions": [
                    {
                        "type":"message",
                        "label":"臺北車站",
                        "text": "中正區"
                    },
                    {
                        "type":"message",
                        "label":"新北市",
                        "text": "新北市"
                    },
                    {
                        "type":"message",
                        "label":"台北市",
                        "text": "台北市"
                    }
                  ]
                }
            ],
            "imageAspectRatio": "rectangle",
            "imageSize": "cover"
        }
      
}

var locatation = ['新莊區','板橋區','中和區','中正區','新北市','台北市']

console.log('webhook正常');


bot.on('message',function(event){
    var replytext = String(event.message.text);
    var newturl = String('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-071?Authorization=CWB-24BEA5F2-97E9-4CC9-8397-86C471D270AC&format=JSON&locationName=' + encodeURIComponent(replytext) + '&elementName=WeatherDescription');
    var turl = String('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-061?Authorization=CWB-24BEA5F2-97E9-4CC9-8397-86C471D270AC&format=JSON&locationName=' + encodeURIComponent(replytext) + '&elementName=WeatherDescription');
    function weather(urlin){
        request.get(urlin,function(err,res,body){
            var after = JSON.parse(body);
            var weatherary = [];
            var stary = [];
            var etary = [];
            var last = '';
            for(n = 0; n < after.records.locations[0].location[0].weatherElement[0].time.length; n++){
                stary[n] = String(after.records.locations[0].location[0].weatherElement[0].time[n].startTime);
                etary[n] = String(after.records.locations[0].location[0].weatherElement[0].time[n].endTime);
                weatherary[n] = String(after.records.locations[0].location[0].weatherElement[0].time[n].elementValue[0].value);
                last = last.concat(stary[n] + '到' + etary[n] + '\n' + weatherary[n] + '\n');
            };
            var replyary = weatherary[0].split("。");
            if(replyary[0] == '多雲午後短暫雷陣雨'){
                replyary[0] = '⛈' + replyary[0];
            }else if(replyary[0] == '晴'){
                replyary[0] = '☀' + replyary[0];
            }else if(replyary[0] == '午後短暫雷陣雨'){
                replyary[0] = '🌦' + replyary[0];
            }else if(replyary[0] == '多雲'){
                replyary[0] = '🌥' + replyary[0];
            }else if(replyary[0] == '多雲短暫陣雨'){
                replyary[0] = '🌧' + replyary[0];
            }else if(replyary[0] == '陰天'){
                replyary[0] = '☁' + replyary[0];
            };
            var t = String(replyary[2].match(/\d+/g));
            var tempa = t.replace(',','~');
            var all = replyary[0] + '\n💧' + replyary[1].match(/\d+/g) + '% ' + '🌡' + tempa;              
            event.reply(all).then(function(data){
                console.log('回覆：\n',all);
            }).catch(function(error){
                console.log('錯誤：',error);
            });
        });
    };
    function allweather(urlinn){
        request.get(urlinn,function(errr,ress,bodyy){
            var afterr = JSON.parse(bodyy);
            var replyy = String(afterr.records.location[0].weatherElement[0].time[0].parameter.parameterName);
            var templ = String(afterr.records.location[0].weatherElement[2].time[0].parameter.parameterName);
            var temph = String(afterr.records.location[0].weatherElement[4].time[0].parameter.parameterName);
            if(templ == temph){
                var tempp = templ;
            }else{
                var tempp = templ + '~' + temph;
            };
            if(replyy == '多雲午後短暫雷陣雨'){
                replyy = '⛈' + replyy;
            }else if(replyy == '晴'){
                replyy = '☀' + replyy;
            }else if(replyy == '午後短暫雷陣雨'){
                replyy = '🌦' + replyy;
            }else if(replyy == '多雲'){
                replyy = '🌥' + replyy;
            }else if(replyy == '多雲短暫陣雨'){
                replyy = '🌧' + replyy;
            }else if(replyy == '陰天'){
                replyy = '☁' + replyy;
            };
            var alll = String( replyy + '\n💧' 
                    + String(afterr.records.location[0].weatherElement[1].time[0].parameter.parameterName) + '%' + '🌡'
                    + String(tempp)
                    );
            event.reply(alll).then(function(data){
                console.log('回覆：\n',alll);
            }).catch(function(error){
                console.log('錯誤：',error);
            });
        });
    };
    if(replytext.indexOf('天氣') != -1){
        event.reply(message);
    }else if(replytext.indexOf('新莊區') != -1){
        weather(newturl);
    }else if(replytext.indexOf('板橋區') != -1){
        weather(newturl);
    }else if(replytext.indexOf('中和區') != -1){
        weather(newturl);
    }else if(replytext.indexOf('中正區') != -1){
        weather(turl);
    }else if(replytext.indexOf('新北市') != -1){
        var allurl = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-24BEA5F2-97E9-4CC9-8397-86C471D270AC&format=JSON&locationName=' + encodeURIComponent(replytext);
        allweather(allurl);
    }else if(replytext.indexOf('台北市') != -1){
        var allurl = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-24BEA5F2-97E9-4CC9-8397-86C471D270AC&format=JSON&locationName=' + encodeURIComponent('臺北市');
        allweather(allurl);
    }else if(replytext.match('新北')){
        var replytext = replytext.substr(2,2) + '區';
        newturl = String('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-071?Authorization=CWB-24BEA5F2-97E9-4CC9-8397-86C471D270AC&format=JSON&locationName=' + encodeURIComponent(replytext) + '&elementName=WeatherDescription');
        try{
            weather(newturl);
            console.log('新北市' + newturl);
        }catch(e){
            event.reply('沒有這個區啦');
        };
    }else if(replytext.match('台北')){
        var replytext = replytext.substr(2,2) + '區';
        turl = String('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-061?Authorization=CWB-24BEA5F2-97E9-4CC9-8397-86C471D270AC&format=JSON&locationName=' + encodeURIComponent(replytext) + '&elementName=WeatherDescription');
        try{
            weather(turl);
            console.log('新北市' + newturl);
        }catch(e){
            event.reply('沒有這個區啦');
        };
        console.log('台北市' + replytext + turl);
    }else{
        event.reply('崩╰(〒皿〒)╯潰\n不是已經跟你說\n要怎麼回了！');
    };
});

var linebotParser = bot.parser();
router.post('/',linebotParser);

module.exports = router;