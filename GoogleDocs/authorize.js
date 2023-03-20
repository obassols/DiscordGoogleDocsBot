const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
require('dotenv').config();

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/documents'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const DOC_PATH = path.join(process.cwd(), 'doc.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    console.log('No saved credentials found');
    console.log(err);
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  console.log('Authorizing...');
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    console.log('Loaded saved credentials');
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    console.log('Saving credentials');
    await saveCredentials(client);
  }
  console.log('Authorized');
  return client;
}

async function getDoc() {
  const doc = await getDocFromFile();
  if (doc) {
    return doc;
  } else {
    return await createDoc();
  }
}

async function getDocFromFile() {
  try {
    const content = await fs.readFile(DOC_PATH);
    const doc = JSON.parse(content);
    return doc;
  } catch (err) {
    console.log('No saved document found');
    return null;
  }
}


async function createDoc() {
  try {
    console.log("Creating document...");
    
    const client = await authorize();
    console.log(client);

    // Create a new Google Docs API client
    const docs = google.docs({ version: 'v1', auth: client });
    console.log(docs);

    // Create a new Google Docs document
    const doc = await docs.documents.create({
      requestBody: {
        title: 'Discord Logs'
      }
    });

    // Save the document ID
    fs.writeFile(DOC_PATH, JSON.stringify(doc.data));

    // Log the document ID
    console.log(`Created new Google Docs document with ID: ${doc.data.documentId}`);
    return doc.data;
  } catch (err) {
    console.error("Error creating document");
    console.error(err);
  }
}

module.exports = {
  authorize,
  getDoc
};