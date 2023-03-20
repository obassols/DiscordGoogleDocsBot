const googleDocsLogs = require('../GoogleDocs/addText');

async function createMessage(interaction) {
  const date = new Date().toLocaleString();
  const logMessage = `\n [${interaction.channel.name}] (${date}) Message from ${interaction.author.username}: ${interaction.content} \n`;
  googleDocsLogs.addText(logMessage);
}

module.exports = createMessage;
