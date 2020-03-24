// Reply with two static messages

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let userId;
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    userId = req.body.events[0].source.userId
    reply(reply_token)
    res.sendStatus(200)
})

app.get('/broadcast', ( res) => {
    // let reply_token = req.body.events[0].replyToken
    broadcast()
    res.sendStatus(200)
})

app.listen(port)


function broadcast()
{
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {ZqmVt0vzontNiw/RfJzkXVAc64LZnznK14CiM8HzK5q1Divn67alwvpt0ZPaxwa+XgbB0VPPS3NDumzQbhwUBGq5+lDtzCvCMAhrDX0YGxGo+h5ECvQXiU5OijcJWiLSrBnnbUmmY/c6Embl5O2fFwdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        to: userId,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/push',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}


function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {ZqmVt0vzontNiw/RfJzkXVAc64LZnznK14CiM8HzK5q1Divn67alwvpt0ZPaxwa+XgbB0VPPS3NDumzQbhwUBGq5+lDtzCvCMAhrDX0YGxGo+h5ECvQXiU5OijcJWiLSrBnnbUmmY/c6Embl5O2fFwdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}