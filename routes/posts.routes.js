const { Router } = require('express')
const router = Router()

const { getPosts, getPostPaths, getPostByPath, autoCompleteIndex } = require('../controllers/posts.controllers');

router.get('/', getPosts);
router.get('/paths', getPostPaths);
router.get('/:path', getPostByPath);
router.get('/search/:keyword', autoCompleteIndex);

module.exports = router;