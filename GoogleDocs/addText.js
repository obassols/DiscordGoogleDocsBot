const { google } = require('googleapis');
const googleDocsAuth = require('./authorize');
const { authorize } = require('./authorize');

/**
 * Adds text to the google doc.
 * @param {string} string
 */
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