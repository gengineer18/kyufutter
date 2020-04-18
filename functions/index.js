const functions = require('firebase-functions')
const express = require('express')
const app = express()
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

// Firebaseのproject ID
const projectId = 'kyufutter10'
const keyFilename = 'privateKey.json'

// OGPが保存されてるCloudStorageのバケット
const bucketName = 'kyufutter10.appspot.com'

// async function generateSignedUrl(bucketName, filename) {
//   // [START storage_generate_signed_url]
//   // Imports the Google Cloud client library
//   const { Storage } = require('@google-cloud/storage')

//   // Creates a client
//   const storage = new Storage({
//     projectId,
//     keyFilename
//   })

//   /**
//    * TODO(developer): Uncomment the following lines before running the sample.
//    */
//   // const bucketName = 'Name of a bucket, e.g. my-bucket';
//   // const filename = 'File to access, e.g. file.txt';

//   // These options will allow temporary read access to the file
//   const options = {
//     action: 'read',
//     expires: Date.now() + 1000 * 60 * 60 * 24 * 30 // 1month
//   }

//   // Get a signed URL for the file
//   const [url] = await storage
//     .bucket(bucketName)
//     .file(filename)
//     .getSignedUrl(options)

//   // console.log(`The signed url for ${filename} is ${url}.`)
//   // [END storage_generate_signed_url]
//   return url
// }

// // const url = 'https://kyufutter10.web.app/'
// const siteName = '10万円給付ったー'
// const title = '10万円給付ったー'
// const metaDescription =
//   '日本政府が国民1人あたり10万円を給付する方針を固めたようです。皆さんは10万円給付されたら何を買いたいですか？何をしたいですか？'
// const metaKeywords = ['10万円給付']
// const ogDescription =
//   '日本政府が国民1人あたり10万円を給付する方針を固めたようです。皆さんは10万円給付されたら何を買いたいですか？何をしたいですか？'
// const ogImageWidth = 1200
// const ogImageHeight = 630
// const fbAppid = ''
// const twDescription =
//   '日本政府が国民1人あたり10万円を給付する方針を固めたようです。皆さんは10万円給付されたら何を買いたいですか？何をしたいですか？'
// const twSite = ''
// const twCreator = ''

// const genHtml = (url) => `
// <!DOCTYPE html>
// <html>
//   <head>
//     <meta charset="utf-8">
//     <title>${title}</title>
//     <meta name="description" content=${metaDescription}>
//     <meta name="keywords" content=${metaKeywords.join(',')}>
//     <meta property="og:locale" content="ja_JP">
//     <meta property="og:type" content="website">
//     <meta property="og:url" content=${url}>
//     <meta property="og:title" content=${title}>
//     <meta property="og:site_name" content=${siteName}>
//     <meta property="og:description" content=${ogDescription}>
//     <meta property="og:image" content=${url}>
//     <meta property="og:image:width" content=${ogImageWidth}>
//     <meta property="og:image:height" content=${ogImageHeight}>
//     <meta property="fb:app_id" content=${fbAppid}>
//     <meta name="twitter:card" content="summary_large_image">
//     <meta name="twitter:title" content=${title}>
//     <meta name="twitter:description" content=${twDescription}>
//     <meta name="twitter:image" content=${url}>
//     <meta name="twitter:site" content=${twSite}>
//     <meta name="twitter:creator" content=${twCreator}>
//   </head>
//   <body>
//     <script>
//       // クローラーにはメタタグを解釈させて、人間は任意のページに飛ばす
//       location.href = '/';
//     </script>
//   </body>
// </html>
// `

// app.get('/:id', async (req, res) => {
//   const doc = await db
//     .collection('posts')
//     .doc(req.params.id)
//     .get()
//   if (!doc.exists) {
//     // console.log(`${req.params.id} not exist`)
//     res.status(404).send('404 Not Exist')
//   } else {
//     const url = await generateSignedUrl(bucketName, `${req.params.id}.png`)
//     const html = genHtml(url)
//     res.set('cache-control', 'public, max-age=3600')
//     res.send(html)
//   }
// })
// exports.s = functions.region('asia-northeast1').https.onRequest(app)

exports.bigben = functions.https.onRequest((req, res) => {
  const SITEURL = '〇〇〇〇〇'
  const TITLE = '〇〇〇〇〇'
  const DESCRIPTION = '〇〇〇〇〇'
  const IMAGE = `https://firebasestorage.googleapis.com/v0/b/kyufutter10.appspot.com/o/2AIv9IbILNHkmw6wdcsj.png?alt=media&token=15c9c733-9522-4f81-903f-90ad623d7239`

  res.status(200).send(`<!doctype html>
    <head>
      <title>Time</title>
      <meta property="og:title" content="${TITLE}">
      <meta property="og:image" content="${IMAGE}">
      <meta property="og:description" content="${DESCRIPTION}">
      <meta property="og:url" content="${SITEURL}">
      <meta property="og:type" content="website">
      <meta property="og:site_name" content="${TITLE}">
      <meta name="twitter:site" content="〇〇〇〇〇〇">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${TITLE}">
      <meta name="twitter:image" content="${IMAGE}">
      <meta name="twitter:description" content="${DESCRIPTION}">
    </head>
    <body>
      ${'BONG '.repeat(3)}
    </body>
  </html>`)
})
