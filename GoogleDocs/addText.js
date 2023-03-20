
const fs = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');
const { authorize } = require('./authorize');
const DOC_PATH = path.join(process.cwd(), 'doc.json');
const SCOPES = ['https://www.googleapis.com/auth/documents'];
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

async function addText(string) {
  const doc = await getDocFromFile();
  const auth = await authorize();
  const docs = google.docs({
    version: "v1",
    auth
  });

  console.log("Adding text to document");
  docs.documents.batchUpdate({
    auth,
    documentId: doc.documentId,
    requestBody: {
      requests: [
        {
          insertText: {
            location: {
              index: 1
            },
            text: string
          }
        }
      ]
    }
  });
  console.log("Added text to document");
}

async function getDocFromFile() {
  try {
    const content = await fs.readFile(DOC_PATH);
    const doc = JSON.parse(content);
    console.log(doc)
    return doc;
  } catch (err) {
    console.log('No saved document found');
    console.log(err);
    return null;
  }
}

module.exports = {
  addText
};