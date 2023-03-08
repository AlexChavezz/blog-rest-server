const { ObjectId } = require('mongodb');


const commentsCollection = require('../database/Client').db('blog').collection('comments');

const getCommentsByPost = async (req, res) => {
    const { post:postTitle } = req.params;
    try
    {
        let comments  = await commentsCollection.aggregate([
            { $match: { "postTitle": postTitle } }
        ]).toArray();

        return res.status(200).json(comments);
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}


const saveComment = async (req, res) => {

    const document = req.body;
    console.log(document)
    try
    {
        const { insertedId } = await commentsCollection.insertOne(document);
        if( insertedId )
        {
            return res.status(200).json({message:"comment inserted success", insertedId});
        }
        return res.status(400).json({message:"Bad request"})
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"Internal Server Error"})
    }
}


const updateCommentReplies = async (req, res) => {
    const object = req.body;
    object.reply_id = new ObjectId();
    const { _id , ...rest} = object;
    try
    {
        const { acknowledged, ...dada } = await commentsCollection.updateOne({ "_id": {$eq: ObjectId(_id)} }, {$push:{replies: rest}})
        console.log(dada)
        if(acknowledged)
        {
            return res.status(200).json({message:"comment updated success", insertedId: object.reply_id});
        }    
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}



module.exports = {
    getCommentsByPost,
    saveComment,
    updateCommentReplies,
}