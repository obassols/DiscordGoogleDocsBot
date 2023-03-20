const googleDocsLogs = require('../GoogleDocs/addText');

async function createMessage(interaction) {
  const date = new Date().toLocaleString();
  const logMessage = `\n[${interaction.channel.name}] (${date}) ${interaction.author.username} sent the message: "${interaction.content}" \n`;
  googleDocsLogs.addText(logMessage);
}

async function updateMessage(interaction) {
  if (interaction.content === interaction.reactions.message.content) return;
  
  const date = new Date().toLocaleString();
  const logMessage = `\n[${interaction.channel.name}] (${date}) ${interaction.author.username} edited the message: "${interaction.content}" to "${interaction.reactions.message.content}" \n`;
  googleDocsLogs.addText(logMessage);
}

async function deleteMessage(interaction) {
  const date = new Date().toLocaleString();
  const logMessage = `\n[${interaction.channel.name}] (${date}) ${interaction.author.username} deleted the message: "${interaction.content}" \n`;
  googleDocsLogs.addText(logMessage);
}

async function addReaction(interaction) {
  const date = new Date().toLocaleString();
  let logMessage = `(${date}) ${interaction.message.author.username} message "${interaction.message.content}" received this reaction: "${interaction.emoji.name}" \n`;
  
  if (interaction.count > 1) {
    logMessage = `\nThis message now has ${interaction.count} reactions of "${interaction.emoji.name}" \n` + logMessage;
  } else {
    logMessage = `\n` + logMessage;
  }
  googleDocsLogs.addText(logMessage);
}

async function removeReaction(interaction) {
  const date = new Date().toLocaleString();
  let logMessage = `(${date}) ${interaction.message.author.username} message "${interaction.message.content}" lost a reaction: "${interaction.emoji.name}" \n`;
  if (interaction.count === 0) {
    logMessage = `\nThis message doesn't have "${interaction.emoji.name}" reactions anymore \n` + logMessage;
  } else if (interaction.count > 1) {
    logMessage = `\nThis message now has ${interaction.count} reactions of "${interaction.emoji.name}" \n` + logMessage;
  } else {
    logMessage = `\nThis message has only one "${interaction.emoji.name}" remaining \n` + logMessage;
  }
  googleDocsLogs.addText(logMessage);
}

async function removeAllReactions(interaction) {
  const date = new Date().toLocaleString();
  const logMessage = `\n(${date}) ${interaction.author.username} removed all reactions for the message: "${interaction.content}" \n`;
  googleDocsLogs.addText(logMessage);
}

module.exports = {
  createMessage,
  updateMessage,
  deleteMessage,
  addReaction,
  removeReaction,
  removeAllReactions
};
