# 氣天機器人
一個惹怒老天的機器人,所以叫氣天
* 申請linebot帳號和氣象局帳號
* 填入token
* 填入縣市和區到message
* 填入氣象局api網址
* 找一個伺服器例如heroku在routes裡面把改好的webhook.js丟進去,把app.js裡面解析json的部份註釋掉,並加上/webhook的路徑
* 到linebot後台填上伺服器網址要記得去掉https://和加上/webhook在最後
* 把檔案推上去
* 幫我按星星
