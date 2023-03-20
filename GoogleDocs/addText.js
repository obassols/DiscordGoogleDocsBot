
const fs = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');
const googleDocsAuth = require('./authorize');
const { authorize } = require('./authorize');
const DOC_PATH = path.join(process.cwd(), 'doc.json');
const SCOPES = ['https://www.googleapis.com/auth/documents'];
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

async function addText(string) {
  const doc = await googleDocsAuth.getDoc();
  const auth = await authorize();
  const docs = google.docs({
    version: "v1",
    auth
  });

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

module.exports = {
  addText
};