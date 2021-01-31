class Message {
    getInlineKeyboardButton (text)
    {
        return [{
            text: text,
            callback_data: 'ewasdf'
        }]
    }
    getInlineKeyboardMarkup (text) {
        return {inline_keyboard: [this.getInlineKeyboardButton(text), this.getInlineKeyboardButton(text)]}
    }
}

module.exports = Message;
