require('dotenv').config()
const axios = require('axios')
const basuprl = 'https://api.telegram.org'
const express = require('express');
const app = express()
const port = 3000;

app.use(require('body-parser').json())
app.get('/', (req, res) => {
    res.send('Success');
})

app.post('/handler', (req, res) => {
    console.log(req.body)
    console.log("eeee")
    axios.post(basuprl + '/bot' + process.env.TELEGRAM_TOKEN + '/sendMessage', {chat_id: req.body.message.chat.id, text: 'hello'})
        .then((resp) => {
            console.log(resp.status)

        })
        .catch((erorr) => {
            console.log(erorr)
        })
    res.send('Success');
})

app.post('/:token/setWebhook', (req, res) => {
    console.log(req.body.url)
    if (req.body && req.body.url && req.params.token === process.env.TELEGRAM_TOKEN) {
        axios.post(basuprl + '/bot' + req.params.token + '/setWebhook', {url: req.body.url})
            .then((resp) => {
                console.log(resp.status)

            })
            .catch((erorr) => {
                console.log(erorr)
            })
}
    res.send('Ok')
})

app.listen(port, () => {
    console.log(process.env.TELEGRAM_TOKEN)
    console.log('server started ' + port)
})