# 氣天機器人
一個惹怒老天的機器人,所以叫氣天,為什麼要自己做linebot,因為想要多少方便,就要付出多少人工
* 申請linebot帳號和氣象局帳號
* 填入`token`
* 填入縣市和區到`message`
* 填入氣象局api網址
* 找一個伺服器例如heroku在routes裡面把改好的webhook.js丟進去,把app.js裡面解析json的部份註釋掉,並加上`/webhook`的路徑
* 到linebot後台填上伺服器網址要記得去掉`https://`和加上`/webhook`在最後
* 把檔案推上去
* 幫我按星星
* 你有看到最後,所以再提醒你選單沒有發出去通常是,格式有錯,還有可以先在本機用ngrok測試,再推上去,有typeError是因為api回傳長度不變,所以for要用length
