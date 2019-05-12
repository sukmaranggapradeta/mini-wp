const storage = require('@google-cloud/storage').Storage

const GOOGLE_CLOUD_PROJECT_ID = process.env.PROJECT_ID // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = `../server/gpc-upload-image-a65161c7e335.json`; // Replace with the path to the downloaded private key
const gcs = new storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE,
})


const bucketName = 'image-storage.sukmaranggapradeta.com' //diganti proccess.env jadi err
const bucket = gcs.bucket(bucketName)

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${bucketName}/${filename}`
}

const ImgUpload = {}

ImgUpload.uploadMulti = async (req, res, next) => {
    console.log('masuk upload', req.file)
  if (!req.files || !req.files[0]) {
    res.status(500).json({
      status: false,
      message: 'An error has occured, please try again.',
      result: [],
    })
  }
  else {
    const arrFile = []
    // Can optionally add a path to the gcsname below by concatenating it before the filename
    const getLink = await req.files.map(async (data) => {
      const indexSlash = data.mimetype.split('').indexOf('/') + 1
      const mimeType = data.mimetype.slice(indexSlash)
      const gcsname = 'fotooooo'+'.'+mimeType
      const file = bucket.file(gcsname)
      const stream = file.createWriteStream({
        metadata: {
          contentType: data.mimetype,
        },
      })

      stream.on('error', (err) => {
        req.file.cloudStorageError = err
        next(err)
      })

      stream.on('finish', () => {
        data.cloudStorageObject = gcsname
        file.makePublic().then(() => {
          data.cloudStoragePublicUrl = getPublicUrl(gcsname)
        })
      })
      arrFile.push(getPublicUrl(gcsname))

      stream.end(data.buffer)
    })
    await Promise.all(getLink)

    req.fileArr = arrFile
    next()
  }
}

ImgUpload.uploadSingle = async (req, res, next) => {
    console.log('masuk upload', req.file)

  if (!req.file) {
    return next()
  }
  const { source } = req.query
  const indexSlash = req.file.mimetype.split('').indexOf('/') + 1
  const mimeType = req.file.mimetype.slice(indexSlash)
  const gcsname = req.file.originalname+'.'+mimeType
  req.filePhoto = getPublicUrl(gcsname)
  
  const file = bucket.file(gcsname)
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', async () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      next()
    })
  })
  stream.end(req.file.buffer)

}

module.exports = ImgUpload