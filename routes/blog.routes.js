const { Router } = require('express');
const { getCommentsByPost, saveComment } = require('../controllers/blog.controllers');

const router = Router();

router.get('/get/:post', getCommentsByPost);
router.post('/save', saveComment)

module.exports = router;