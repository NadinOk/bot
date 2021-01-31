require('dotenv').config()
const sequelize = require('../db/database')
const sql = require('mysql2')
const axios = require('axios')
const baseUprl = 'https://api.telegram.org'
const express = require('express');
const app = express()
const port = 3000;
const User = require('../models/users')
const Message = require('../telegram/message')

const message = new Message();

app.use(require('body-parser').json())

app.get('/', (req, res) => {
    res.send('Success');
})

app.post('/handler', async (req, res) => {
   console.log(req.body)
    if (req.body.message !== undefined) {
        const user = await User.findOne({where: {telegram_id: req.body.message.from.id}})
        if (user === null ){
             await User.create({
                first_name: req.body.message.from.first_name,
                last_name: req.body.message.from.last_name,
                telegram_id: req.body.message.from.id,
                user_name: req.body.message.from.username
            })
        } else {
            console.log(user.dataValues.id + ' send some message')
        }


        axios.post(baseUprl + '/bot' + process.env.TELEGRAM_TOKEN + '/sendMessage', {chat_id: req.body.message.chat.id, text: 'hello', reply_markup: message.getInlineKeyboardMarkup('test button')})
            .then((resp) => {
                console.log(resp.status)

            })
            .catch((erorr) => {
                console.log(erorr)
            })
        res.send('Success');
    }

})

app.post('/:token/setWebhook', (req, res) => {

    if (req.body && req.body.url && req.params.token === process.env.TELEGRAM_TOKEN) {
        axios.post(baseUprl + '/bot' + req.params.token + '/setWebhook', {url: req.body.url})
            .then((resp) => {
                console.log(resp)
                res.send("Success")
            })
            .catch((erorr) => {
                console.log(erorr)
                res.status(400).send("Error")
            })
} else if (req.body.callback_query !== undefined) {
        console.log(req.body.callback_query.data)
    }
    else {
        res.status(400).send("Wrong bot token")
    }
})

app.listen(port, () => {
    console.log('server started ' + port)
})