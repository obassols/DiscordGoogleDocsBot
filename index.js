const { Client, GatewayIntentBits, Events, ActivityType } = require('discord.js');
const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.MessageContent,

] });
require('dotenv').config();

client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // client.user.setActivity('Writing a Google Docs', { type: ActivityType.Playing });
  /* const channel = client.channels.cache.get('id');
  console.log(channel);
  if (channel) channel.send('content'); */
});

client.on(Events.MessageCreate, async interaction => {
  if (interaction.author.bot) return;

  console.log(interaction);
  if (interaction.content === 'ping') {
    interaction.reply('Pong!');
  }
});

client.login(process.env.BOT_TOKEN);