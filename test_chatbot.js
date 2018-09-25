/*
  Put in information regarding your bot account and
  channel you want your bot to listen in on.
*/
const BOT_USERNAME = "insert_bot_username";
const BOT_PASSWORD = "insert_bot_api_key";
const CHANNEL = "insert_channel_name";

const TWITCHJS = require('twitch-js');

var options = {
  options: {
    debug: true
  },
  connection: {
    cluster: "aws",
    reconnect: true
  },
  identity: {
    username: BOT_USERNAME,
    password: BOT_PASSWORD
  },
  channels: [CHANNEL]
}

var client = new TWITCHJS.client(options);
client.connect();

client.on('chat', function(channel, user, message, self) {
  if(message === "!hello") {
    client.action(CHANNEL, user['display-name'] + " hello.");
  }
});

client.on('connected', function(address, port) {
  console.log("Address: " + address + " Port: " +port);
  client.action(CHANNEL, "Hello everyone, I'm just starting up.");
});
