const { Router } = require('express');
const { getCommentsByPost, saveComment, updateCommentReplies } = require('../controllers/blog.controllers');

const router = Router();

router.get('/get/:post', getCommentsByPost);
// router.post('/save', saveComment)
router.put('/save-reply', updateCommentReplies);
router.post('/save-comment', saveComment);
module.exports = router;