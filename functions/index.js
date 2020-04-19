const functions = require('firebase-functions')
const express = require('express')
const app = express()
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

const url = 'https://kyufutter10.web.app/'
const siteName = '10万円給付ったー'
const title = '10万円給付ったー'
const metaDescription =
  '日本政府が国民1人あたり10万円を給付する方針を固めたようです。皆さんは10万円給付されたら何を買いたいですか？何をしたいですか？'
const ogDescription =
  '日本政府が国民1人あたり10万円を給付する方針を固めたようです。皆さんは10万円給付されたら何を買いたいですか？何をしたいですか？'
const ogImageWidth = 1200
const ogImageHeight = 630
const fbAppid = ''
const twDescription =
  '日本政府が国民1人あたり10万円を給付する方針を固めたようです。皆さんは10万円給付されたら何を買いたいですか？何をしたいですか？'
const twSite = 'https://kyufutter10.web.app/'
const twCreator = ''

const genHtml = (imageUrl) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="description" content="${metaDescription}">
    <meta property="og:locale" content="ja_JP">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${title}">
    <meta property="og:site_name" content="${siteName}">
    <meta property="og:description" content="${ogDescription}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:image:width" content="${ogImageWidth}">
    <meta property="og:image:height" content="${ogImageHeight}">
    <meta property="fb:app_id" content="${fbAppid}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${twDescription}">
    <meta name="twitter:image" content="${imageUrl}">
    <meta name="twitter:site" content="${twSite}">
    <meta name="twitter:creator" content="${twCreator}">
  </head>
  <body>
    <script>
      location.href = '${twSite}';
    </script>
  </body>
</html>
`

app.get('/share/:id', (req, res) => {
  db.collection('posts')
    .where('docId', '==', req.params.id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const html = genHtml(doc.data().url)
        res.send(html)
      })
    })
})
exports.share = functions.https.onRequest(app)
