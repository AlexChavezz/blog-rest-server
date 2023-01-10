
const client = require("../database/Client");

const postsCollection = client.db('blog').collection('posts');

/* Function that should return all posts exists in the database */
async function getPosts(req, res)
{
    try
    {
        const posts = await postsCollection.find({}).sort({date: -1}).toArray();
        return res.status(200).json(posts);
    }
    catch(error)
    {
        return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
}

async function getPostPaths (req, res){
    try
    {
        const postPaths = await postsCollection.find({}, { projection: {path: 1, _id: 0 }}).toArray();
        return res.status(200).json(postPaths);
    }
    catch(error)
    {
        return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
}

async function getPostByPath(req, res) {
    try
    {
        const post = await postsCollection.findOne({ path: req.params.path });
        return res.status(200).json(post);
    }
    catch(error)
    {
        return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
}



async function pushPost(req, res)
{
    try
    {

    }
    catch(error)
    {
        return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
}


module.exports = {
    getPosts,
    getPostPaths,
    getPostByPath
}