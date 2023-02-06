
const client = require("../database/Client");
const {v4 : uuidv4} = require('uuid');
const postsCollection = client.db('blog').collection('posts');

/* Function that should return all posts exists in the database */
async function getPosts(req, res)
{
    try
    {
        const posts = await postsCollection.find({}, {projection: { _id: 0, path: 1, postName: 1, date: 1, categories: 1, author: 1, mainImage: 1 }})
        .sort({date: -1}).toArray();
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

async function autoCompleteIndex(req, res){
    try
    {
        const keyword = req.params.keyword;
        const pipeline = [
            {
                $search: {
                    autocomplete:{
                        query: keyword,
                        path: "content"
                    }
                },
            },
            {
                $project: {
                    "_id": 0,
                    "postName": 1,
                    "path": 1
                }
            }
        ]
        const posts = await postsCollection.aggregate(pipeline).toArray();
        return res.status(200).json(posts);
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
}

async function getLastPost(req, res){
    try
    {
        const lastPost = await postsCollection.find({}).sort({date: -1})
        .limit(1).toArray();
        return res.status(200).json(lastPost);
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
}

async function createPost(req, res)
{
    if( req.body.SECRET_KEY !== process.env.SECRET_KEY )
    {
        return res.status(401).json({ message: "UNAUTHORIZED" });
    }
    try
    {
        const post = req.body;
        await postsCollection.insertOne({...post, date: new Date()});
        return res.status(201).json({ message: "Post was created successfully", ok: true });
    }
    catch(error)
    {
        return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
}

const multer = require('multer');
const { BlobServiceClient } = require("@azure/storage-blob");
const 
    inMemoryStorage = multer.memoryStorage()
    uploadStrategy = multer({ storage: inMemoryStorage }).single('image')


async function uploadImage(req, res)
{
    try
    {
        const file = req.file;
        file.originalname = uuidv4() + file.originalname;
        
        // -> get blob container client
        const blobServiceClient = BlobServiceClient.fromConnectionString(
            process.env.AZURE_STORAGE_CONNECTION_STRING
        );
        const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME);

        // -> Set file name. This must be unique.
        const blobBlockClient = containerClient.getBlockBlobClient(file.originalname);
        await blobBlockClient.upload(req.file.buffer, req.file.buffer.length);
        return res.status(201).json({ message: "File was uploaded successfully", thumbnailUrl: blobBlockClient.url });
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
}

module.exports = {
    getPosts,
    getPostPaths,
    getPostByPath,
    autoCompleteIndex,
    getLastPost,
    createPost,
    uploadImage
}