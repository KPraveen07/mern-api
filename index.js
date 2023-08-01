const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ItemsModel = require('./models/Items')

const app = express()
app.use(cors())

// const allowCors = fn => async (req, res) => {
//     //res.setHeader('Access-Control-Allow-Credentials', true)
//     res.setHeader('Access-Control-Allow-Origin', 'https://mern-frontend-steel.vercel.app')
//     // another common pattern
//     // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//     res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//     res.setHeader(
//       'Access-Control-Allow-Headers',
//       'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//     )
//     if (req.method === 'OPTIONS') {
//       res.status(200).end()
//       return
//     }
//     return await fn(req, res)
//   }
  
//   const handler = (req, res) => {
//     const d = new Date()
//     res.end(d.toString())
//   }
  
//   module.exports = allowCors(handler)

app.use(express.json())

//mongoose.connect("mongodb://127.0.0.1:27017/MERN")
const MONGODB_URI = 'mongodb+srv://mern-net:<GgbLJeZKYKeygb4Y>@mern-net.xnunrss.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to the database");
  });

app.get("/", (req, res) => {
    ItemsModel.find({})
    .then(items => res.json(items))
    .catch(err => res.json(err))
})
 
app.post("/CreateItems", (req, res) => {
    ItemsModel.create(req.body)
    .then(items => res.json(items))
    .catch(err => res.json(err))
})

app.get('/getItem/:id', (req, res) => {
    const id = req.params.id;
    ItemsModel.findById({_id:id})
    .then(items => res.json(items))
    .catch(err => res.json(err))
})

app.put('/UpdateItems/:id', (req, res) => {
    const id = req.params.id;
    ItemsModel.findByIdAndUpdate({_id :id}, {
        sn:req.body.sn,
         name:req.body.name, 
         image:req.body.image, 
         category:req.body.category, 
         label:req.body.label, 
         price:req.body.price, 
         description:req.body.description})
        .then(items => res.json(items))
        .catch(err => res.json(err))   
    })

// app.delete('/deleteItem/:id', (req, res) => {
//     const id = req.params.id;
//     ItemsModel.findByIdAndDelete({_id: id})
//     .then(res => res.json(res))
//     .catch(err => json(err))
// })
app.get('/cors', (req, res) => {
    res.send('This has CORS enabled 🎈')
})

app.get('*',(req,res)=>{
    res.status(200).json({
      message:'bad request'
    })
  })

// app.listen(3001, () => {
//     console.log("Server is Running")
// })

module.exports = app;