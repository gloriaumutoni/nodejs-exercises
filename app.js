const express=require('express')
const mongoose = require('mongoose')

//express server that handles routes
const app=express()
const port=3000

//establishing connection to database
const dbURI =
  "mongodb+srv://gloriaumutoni54:fFF2RWZYkKFP1p6o@cluster0.8k6l5.mongodb.net/item?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbURI).then(()=>app.listen(port)).catch((err)=>err)
// mongoose.connect(dbURI);

const itemSchema=new mongoose.Schema({
  item:String,
  description:String,
  price:Number
})
 const Item= mongoose.model('Item',itemSchema)

 //rendering items that are in the database
app.get('/items',async (req,resp)=>{
  try{
    const items=await Item.find()
    resp.status(200).json(items)
  } catch (error) {
    resp.status(500).json({ message: 'Error fetching items', error });
}
})
// creating new items and displaying them
app.get('/new-items',async (req,resp)=>{
  try{
const item=new Item({
  item:'pants',
  description:'new cargo pants in stock',
  price:36,
})
item.save().then(result=>resp.send(result)).catch(err=>err)
  }catch(err){
    console.log(err)
  }
})

// getting items by id
app.get('/single-item/',async (req,resp)=>{
try{
  const items=await Item.findById('66d9534f2052175c088ca8f1')
  req.status(200).json(items)
}catch(err){
req.status(500).json({message:'failed to get item with id'},err)
}
})
// app.listen(port)