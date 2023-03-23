const googleDocsAuth = require('./GoogleDocs/authorize');
const { Client, GatewayIntentBits, Events } = require('discord.js');
const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.DirectMessageReactions,
] });
require('dotenv').config();

const messages = require('./commands/messages.js');

client.on(Events.ClientReady, async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  await googleDocsAuth.authorize();
  googleDocsAuth.getDoc();
});

client.on(Events.MessageCreate, (interaction) => messages.createMessage(interaction));

client.on(Events.MessageUpdate, (interaction) => messages.updateMessage(interaction));

client.on(Events.MessageDelete, (interaction) => messages.deleteMessage(interaction));

client.on(Events.MessageReactionAdd, (interaction) => messages.addReaction(interaction));

client.on(Events.MessageReactionRemove, (interaction) => messages.removeReaction(interaction));

client.on(Events.MessageReactionRemoveAll, (interaction) => messages.removeAllReactions(interaction));

client.login(process.env.BOT_TOKEN);