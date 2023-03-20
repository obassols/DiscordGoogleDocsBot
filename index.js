const googleDocsAuth = require('./GoogleDocs/authorize');
const { Client, GatewayIntentBits, Events, ActivityType } = require('discord.js');
const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.MessageContent,

] });
require('dotenv').config();

const createMessage = require('./commands/createMessage.js');

client.on(Events.ClientReady, async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  await googleDocsAuth.authorize();
  googleDocsAuth.getDoc();
});

client.on(Events.MessageCreate, (interaction) =>  createMessage(interaction));

client.login(process.env.BOT_TOKEN);