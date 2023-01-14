const { Router } = require('express')
const router = Router()

const { getPosts, getPostPaths, getPostByPath, autoCompleteIndex, getLastPost } = require('../controllers/posts.controllers');

router.get('/', getPosts);
router.get('/paths', getPostPaths);
router.get('/:path', getPostByPath);
router.get('/search/:keyword', autoCompleteIndex);
router.get('/get/lastPost', getLastPost);
module.exports = router;