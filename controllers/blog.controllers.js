const { ObjectId } = require('mongodb');



const commentsCollection = require('../database/Client').db('blog').collection('comments');
const repliesCollection = require('../database/Client').db('blog').collection('replies');

const getCommentsByPost = async (req, res) => {
    const { post:postTitle } = req.params;
    try
    {
        let comments  = await commentsCollection.aggregate([
            { $match: { "postTitle": postTitle } }
        ]).toArray();

        comments.forEach(async(comment) => {
            try
            {
                comment.replies = await repliesCollection.find({ "commentId": ObjectId(comment._id) }).toArray();
                return res.status(200).json(comments);
            }
            catch(error)
            {
                console.log(error);
                return res.status(500).json({message:"Internal Server Error"})
            }
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}


const saveComment = async (req, res) => {

    const document = {
        ...req.body,
    }
    try
    {
        const { insertedId } = await commentsCollection.insertOne(document);
        return res.status(200).json({message:"comment inserted success", insertedId});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"Internal Server Error"})
    }
}


module.exports = {
    getCommentsByPost,
    saveComment
}