const { Router } = require('express')
const router = Router()

const { getPosts, getPostPaths, getPostByPath, autoCompleteIndex, getLastPost, createPost, uploadImage, getRecommendations } = require('../controllers/posts.controllers');

const multer = require('multer');

const 
    inMemoryStorage = multer.memoryStorage()
    uploadStrategy = multer({ storage: inMemoryStorage }).single('image')

router.get('/', getPosts);
router.get('/paths', getPostPaths);
router.get('/:path', getPostByPath);
router.get('/search/:keyword', autoCompleteIndex);
router.get('/get/lastPost', getLastPost);
router.post('/create', createPost);
router.post('/uploadImage', uploadStrategy, uploadImage);
router.post('/get/recommendations', getRecommendations);
module.exports = router;