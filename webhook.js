var express = require('express');
var router = express.Router();
var linebot = require('linebot');
var request = require('request');

var bot = linebot({
    channelId:'fromline',
    channelSecret:'fromline',
    channelAccessToken:'fromline'
});

var message = {
        "type": "template",
        "altText": "template",
        "template": {
            "type": "carousel",
            "columns": [
                {
                  "thumbnailImageUrl": "",
                  "imageBackgroundColor": "#FFFFFF",
                  "title": "",
                  "text": "",
                  "defaultAction": {
                      "type": "uri",
                      "label": "View detail",
                      "uri": ""
                  },
                  "actions": [
                    {
                        "type":"message",
                        "label":"",
                        "text": ""
                    },
                    {
                        "type":"message",
                        "label":"",
                        "text": ""
                    },
                    {
                        "type":"message",
                        "label":"",
                        "text": ""
                    }
                  ]
                },
                {
                  "thumbnailImageUrl": "",
                  "imageBackgroundColor": "#000000",
                  "title": "",
                  "text": "",
                  "defaultAction": {
                      "type": "uri",
                      "label": "View detail",
                      "uri": ""
                  },
                  "actions": [
                    {
                        "type":"message",
                        "label":"",
                        "text": ""
                    },
                    {
                        "type":"message",
                        "label":"",
                        "text": ""
                    },
                    {
                        "type":"message",
                        "label":"",
                        "text": ""
                    }
                  ]
                }
            ],
            "imageAspectRatio": "rectangle",
            "imageSize": "cover"
        }
      
}

console.log('webhook正常');


bot.on('message',function(event){
    var replytext = String(event.message.text);
    var newturl = String('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-071?Authorization=&format=JSON&locationName=' + encodeURIComponent(replytext) + '&elementName=WeatherDescription');
    var turl = String('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-061?Authorization=&format=JSON&locationName=' + encodeURIComponent(replytext) + '&elementName=WeatherDescription');
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
    }else if(replytext.indexOf('區') != -1){
        weather(newturl);
    }else if(replytext.indexOf('區') != -1){
        weather(newturl);
    }else if(replytext.indexOf('區') != -1){
        weather(newturl);
    }else if(replytext.indexOf('區') != -1){
        weather(turl);
    }else if(replytext.indexOf('市') != -1){
        var allurl = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=&format=JSON&locationName=' + encodeURIComponent(replytext);
        allweather(allurl);
    }else if(replytext.indexOf('市') != -1){
        var allurl = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=&format=JSON&locationName=' + encodeURIComponent('臺北市');
        allweather(allurl);
    }else if(replytext.match('新北')){
        var replytext = replytext.substr(2,2) + '區';
        newturl = String('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-071?Authorization=&format=JSON&locationName=' + encodeURIComponent(replytext) + '&elementName=WeatherDescription');
        try{
            weather(newturl);
            console.log('新北市' + newturl);
        }catch(e){
            event.reply('');
        };
    }else if(replytext.match('台北')){
        var replytext = replytext.substr(2,2) + '區';
        turl = String('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-061?Authorization=&format=JSON&locationName=' + encodeURIComponent(replytext) + '&elementName=WeatherDescription');
        try{
            weather(turl);
            console.log('新北市' + newturl);
        }catch(e){
            event.reply('');
        };
        console.log('台北市' + replytext + turl);
    }else{
        event.reply('');
    };
});

var linebotParser = bot.parser();
router.post('/',linebotParser);

module.exports = router;
