const express=require('express')
const mongoose = require('mongoose')
const app=express()
const port=3000


//establishing connection to database
const dbURI =
  "mongodb+srv://gloriaumutoni54:fFF2RWZYkKFP1p6o@cluster0.8k6l5.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbURI).then(()=>{app.listen(port)}).catch((err)=>err)
