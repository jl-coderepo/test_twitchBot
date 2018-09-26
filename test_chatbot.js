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

var botSleep = false;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

var client = new TWITCHJS.client(options);
client.connect();

client.on('chat', function(channel, user, message, self) {
  if (self) return;
  else if(message === "!hello") {
    client.action(CHANNEL, user['display-name'] + " hello.");
  }
  else if(message === "!poke" && !botSleep) {
      client.action(CHANNEL, user['display-name'] + " ok I'm up.")
      botSleep = true;
  }
  else if(message === "!poke" && botSleep) {
    client.action(CHANNEL, user['display-name'] + " I'm still sleeping!")
    sleep(10000).then(()=>{botSleep=false;});
  }
});

client.on('connected', function(address, port) {
  console.log("Address: " + address + " Port: " +port);
  client.action(CHANNEL, "Hello everyone, I'm just starting up.");
});
