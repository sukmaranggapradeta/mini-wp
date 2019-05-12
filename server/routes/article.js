const Router = require('express').Router()
const articleController = require('../controller/articleController')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
const gcsMiddlewares = require('../middlewares/upload')	
const Multer = require('multer');
  
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
});

Router.post('/upload', multer.single('image'), gcsMiddlewares.uploadSingle, (req, res, next) => {
    console.log(req.file)
    if (req.file && req.file.cloudStoragePublicUrl) {
      return res.send(req.file.cloudStoragePublicUrl);
    }
    return res.status(500).send('Unable to upload');
  },
);
// Router.post('/upload', Multer().single('image'), articleController.image);
// Router.post('/', multer.single('featured_image'), gcsMiddlewares.sendUploadToGCS, articleController.create)
// Router.post('/upload', multer(multerConf).single('myImage'), articleController.upload)
Router.get('/', articleController.getAll)
Router.post('/',authenticate, articleController.create)
Router.get('/:id',authenticate, articleController.getOne)
Router.delete('/:id',authenticate, authorize, articleController.delete)
Router.put('/:id',authenticate, authorize, articleController.update)

module.exports = Router