# telegram-bot-client

[![Build Status](https://travis-ci.org/m90/telegram-bot-client.svg?branch=master)](https://travis-ci.org/m90/telegram-bot-client)

> node.js client for the [Telegram messenger Bot API](https://core.telegram.org/bots/api)

### Installation
Install via npm:

```sh
$ npm install telegram-bot-client --save
```

### Usage
Instantiate a new client using your bot's token:

```js
var TelegramBotClient = require('telegram-bot-client');
var client = new TelegramBotClient(MY_TOKEN);
client.sendMessage(CHAT_ID, 'I\'m a bot, so what?');
```

All methods on the client are chainable and will wait for the previous operations to finish:

```js
client
    .sendMessage(CHAT_ID, 'Hi!')
    .sendMessage(CHAT_ID, 'How are you?')
    .sendMessage(CHAT_ID, 'Be right back!')
    .delay(25000)
    .sendMessage(CHAT_ID, 'Back!')
    .sendMessage(CHAT_ID, 'Wait, I want to show you something, where is it?')
    .delay(7500)
    .sendPhoto(CHAT_ID, SOME_URL_POINTING_TO_A_PHOTO)
    .sendMessage(CHAT_ID, 'How do you like it?')
    .catch(function(err){
        // all errors ocurring in the above call chain
        // will be passed down to this handler
        console.log(err);
    });
```

If you want to consume the response you can unwrap the chain using the `.promise()` method:

```js
client
    .sendMessage(CHAT_ID, 'Did this really work?')
    .promise()
    .then(function(response){
        console.log(response);
    }, function(err){
        console.log(err);
    });
```

### Passing optional arguments:

All methods are following the same convention: Required arguments are passed seperately, all optional parameters can be wrapped into an object and be supplied as the method's last argument:

```js
client.sendMessage(CHAT_ID, 'Look at this: https://www.youtube.com/watch?v=qb_hqexKkw8', { disable_web_page_preview: true });
```

### Available methods:

All [methods described by the API docs](https://core.telegram.org/bots/api#available-methods) are present on the client.

##### `#getMe()`
gets info on the bot

##### `#sendMessage(chatId, text[, options])`
sends a message
- chatId: the chat's id
- text: the message to send

##### `#forwardMessage(chatId, fromChatId, messageId)`
forwards a message
- chatId: the chat's id
- fromChatId: the id of the chat the message is forwarded from
- messageId: the message's id

##### `#sendPhoto(chatId, photoReference[, options])`
sends a photo
- chatId: the chat's id
- photoReference: this can be a local file path, a URL or a telegram file id

##### `#sendAudio(chatId, audioReference[, options])`
sends audio
- chatId: the chat's id
- audioReference: this can be a local file path, a URL or a telegram file id

##### `#sendDocument(chatId, documentReference[, options])`
sends a document
- chatId: the chat's id
- documentReference: this can be a local file path, a URL or a telegram file id

##### `#sendSticker(chatId, stickerReference[, options])`
sends a sticker
- chatId: the chat's id
- stickerReference: this can be a local file path, a URL or a telegram file id

##### `#sendVideo(chatId, videoReference[, options])`
sends video
- chatId: the chat's id
- videoReference: this can be a local file path, a URL or a telegram file id

##### `#sendLocation(chatId, lat, lon[, options])`
sends a location
- chatId: the chat's id
- lat: latitude
- lon: longitude

##### `#sendChatAction(chatId, action)`
sends a chat action
- chatId: the chat's id
- action: the action to send

##### `#getUserProfilePhotos(userId[, options])`
gets a user's profile photos
- userId: the user's id

### License
MIT © [Frederik Ring](http://www.frederikring.com)
