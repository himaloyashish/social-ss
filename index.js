require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")

const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.SOCIAL_NAME}:${process.env.SOCIAL_PASS}@cluster0.6ogtg9l.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    // await client.connect();

    const groupCollection = client.db("social").collection("group")



    app.get("/", async (req, res)=>{
        const result = await groupCollection.find().toArray();
        res.send(result);
    })

    // app.get("/", async(req, res)=>{
    //     const result = await groupCollection.updateOne()
    // })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);















app.get("/", (req, res)=>{
    res.send("Hello World")
})


app.listen(port, ()=>{
    console.log(`Social server is running on Port: ${port}`);
})