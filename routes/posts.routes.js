const { Router } = require('express')
const router = Router()

const { getPosts, getPostPaths, getPostByPath } = require('../controllers/posts.controllers');

router.get('/', getPosts);
router.get('/paths', getPostPaths);
router.get('/:path', getPostByPath);

module.exports = router;