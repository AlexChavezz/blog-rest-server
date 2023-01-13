const client = require("../database/Client");

const suscribersCollection = client.db("blog").collection("suscribers");

async function addSuscriber(req, res)
{
    try
    {
        const suscriber = req.body;

        // -> improve performance of the following code
        // ---
        const isUser = await suscribersCollection.findOne({email: {$eq: suscriber.email}});
        if(isUser)
        {
            return res.status(400).json({message:'USER ALREADY EXISTS', ok: true})
        }
        // ---

        const { acknowledged } = await suscribersCollection.insertOne(suscriber);
        if(!acknowledged)
        {
            return res.status(400).json({message:'BAD REQUEST'})
        }
        return res.status(201).json({message:'USER SAVED SUCCESSFULY', ok: true})
    }
    catch(error)
    {
        return res.status(500).json({message:"INTERNAL SERVER ERROR"})
    }
}



module.exports = {
    addSuscriber
}