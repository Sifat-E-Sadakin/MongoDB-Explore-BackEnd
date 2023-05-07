const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json())

//sifatesadakin10
// zV7qKwpwaJz3I16i


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://sifatesadakin10:zV7qKwpwaJz3I16i@cluster0.rohhp7w.mongodb.net/?retryWrites=true&w=majority";

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
    await client.connect();

    // let database = client.db('newDB');
    // let haiku = database.collection('haiku');
    let database = client.db('newDB').collection('haiku');

    app.get('/user', async (req, res)=>{
      let cursor = database.find();
      let result = await cursor.toArray();
      res.send(result)
      
      
    })

    app.get('/update/:id', async (req, res)=>{
      let id = req.params.id;
      let query = {_id : new ObjectId(id)}
      let result =  await database.findOne(query)
      res.send(result)


    })

    app.put('/update/:id', async( req, res)=>{
      let id = req.params.id
      let user = req.body;
      console.log(user);
      const filter = { _id : new ObjectId(id) };
      const options = { upsert: true };
      const updateUser = {
        $set: {
          name : user.name,
          email : user.email
        },

      };
      let result = await database.updateOne(filter, updateUser, options);
      res.send(result)
    })
    
    app.post('/user', async (req, res)=>{
      let user = req.body;
      console.log(user);

      

     let result = await database.insertOne(user);
     res.send(result)

    })

    app.delete('/user/:id', async (req, res)=>{
     let iid = req.params.id
     console.log(iid);
     let query = {_id : new ObjectId(iid)}
     let result = await database.deleteOne(query);
     res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Mongo server')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })