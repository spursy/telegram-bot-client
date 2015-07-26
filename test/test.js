var assert = require('assert');
var Promise = require('promise');

var TelegramBotClient = require('./../index');

var CHAT_ID = process.env.TELEGRAM_ID || 777000;
var TOKEN = process.env.TELEGRAM_TOKEN;

if (!TOKEN){
	throw new Error('Please set TELEGRAM_TOKEN before running the tests!');
}

describe('TelegramBotClient', function(){

	describe('Chain', function(){
		this.timeout(40000);
		var client = new TelegramBotClient(TOKEN);
		it('exposes all methods in an async chain', function(){
			return client
				.sendMessage(CHAT_ID, 'This is a test')
				.delay(12000)
				.sendMessage(CHAT_ID, 'I can wait')
				.promise();
		});
		it('can be unwrapped into a promise', function(){
			var p = client.sendMessage(CHAT_ID, 'Promises! ftw!').promise();
			assert(p instanceof Promise);
		});
		it('exposes a fake `.then`', function(done){
			var p = client.sendMessage(CHAT_ID, 'Promises! ftw!').then(function(res){
				assert(res.ok);
				done();
			});
		});
		it('passes errors down the chain', function(done){
			client
				.sendMessage(CHAT_ID)
				.delay(99000)
				.sendMessage(CHAT_ID, 'I can wait')
				.catch(function(err){
					assert(err);
					done();
				});
		});
	});

	describe('Methods', function(){

		describe('#sendMessage(chatId, text[, options])', function(){
			this.timeout(10000);
			var client = new TelegramBotClient(TOKEN);
			it('sends a message', function(){
				return client.sendMessage(CHAT_ID, 'Foo Bar!').promise();
			});
			it('rejects on missing arguments', function(done){
				client.sendMessage(CHAT_ID).catch(function(err){
					assert(err);
					done();
				});
			});
		});

		describe('#forwardMessage(chatId, fromChatId, messageId)', function(){
			this.timeout(10000);
			var client = new TelegramBotClient(TOKEN);
			it('forwards sent messages when passing an id', function(){
				return client.sendMessage(CHAT_ID, 'Forward Me!').promise().then(function(response){
					return client.forwardMessage(CHAT_ID, response.result.chat.id, response.result.message_id).promise();
				});
			});
			it('rejects on missing params', function(done){
				client.forwardMessage(CHAT_ID).catch(function(err){
					assert(err);
					done();
				});
			});
		});

		describe('#sendPhoto(chatId, photoReference[, options])', function(){
			this.timeout(25000);
			var client = new TelegramBotClient(TOKEN);
			it('sends a photo using a local file', function(){
				return client.sendPhoto(CHAT_ID, './test/fixtures/pizzacat.jpg').promise();
			});
			it('sends a photo using a URL', function(){
				return client.sendPhoto(CHAT_ID, 'http://cdn.shopify.com/s/files/1/0066/5282/files/pizzacat_2.jpg').promise();
			});
			it('resends photos using file identifiers', function(){
				return client.sendPhoto(CHAT_ID, 'http://www.wowgreatfinds.com/wp-content/uploads/2013/09/three-cats-in-pizza-tshirt-large.jpg').promise().then(function(res){
					return client.sendPhoto(CHAT_ID, res.result.photo[0].file_id);
				});
			});
		});

		describe('#sendLocation(chatId, lat, lon)', function(){
			this.timeout(10000);
			var client = new TelegramBotClient(TOKEN);
			it('sends a location by passing lat and lon', function(){
				return client.sendLocation(CHAT_ID, 52.520007, 13.404954).promise();
			});
			it('rejects on missing params', function(done){
				client.sendLocation(CHAT_ID, 52.520007).catch(function(err){
					assert(err);
					done();
				});
			});
		});

		describe('#sendChatAction(chatId, action)', function(){
			this.timeout(10000);
			var client = new TelegramBotClient(TOKEN);
			it('sends chat actions', function(){
				return client.sendChatAction(CHAT_ID, 'typing').promise();
			});
		});

		describe('#getMe()', function(){
			this.timeout(10000);
			var client = new TelegramBotClient(TOKEN);
			it('gets infos about the bot', function(){
				return client.getMe().promise().then(function(res){
					assert(res.result.id);
				});
			});
		});

	});

});
