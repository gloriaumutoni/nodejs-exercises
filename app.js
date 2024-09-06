const express = require("express");
const mongoose = require("mongoose");

//express server that handles routes
const app = express();
const port = 3000;

//establishing connection to database
const dbURI =
  "mongodb+srv://gloriaumutoni54:fFF2RWZYkKFP1p6o@cluster0.8k6l5.mongodb.net/item?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(dbURI)
  .then(() => app.listen(port))
  .catch((err) => err);

const itemSchema = new mongoose.Schema({
  item: String,
  description: String,
  price: Number,
});
const Item = mongoose.model("Item", itemSchema);

app.use(express.json())

//rendering items that are in the database
app.get("/items", async (req, resp) => {
  try {
    const items = await Item.find();
    resp.status(200).json(items);
  } catch (error) {
    resp.status(500).json({ message: "Error fetching items", error });
  }
});

// creating new items and displaying them
app.get("/new-items", async (req, resp) => {
  try {
    const item = new Item({
      item: "pants",
      description: "new cargo pants in stock",
      price: 36,
    });
    item
      .save()
      .then((result) => resp.send(result))
      .catch((err) => err);
  } catch (err) {
    console.log(err);
  }
});

// getting items by id
app.get("/single-item", async (req, resp) => {
  try {
    const items = await Item.findById("66d95456911798ba6188be6a");
    resp.status(200).json(items);
  } catch (err) {
    console.log(err);
  }
});
app.get("/items/:id", async (req, resp) => {
  const itemsId = req.params.id;
  try {
    const item = await Item.findById(itemsId);
    if (item) {
      resp.status(200).json(item); // If item is found, return it
    } else {
      resp.status(404).json({ message: "Item not found" }); // If item is not found, return 404
    }
  } catch (err) {
    resp.status(500).json({ message: "error occurred on server" }, err);
  }
});


// posting data
app.post('/items-post',async(req,resp)=>{
  try{
    const items=new Item(req.body)
 const savedItems=await items.save()
 resp.status(201).json(savedItems)
  }catch(err){
console.log(err)
  }
})
app.use((req, resp) => {
  console.log(resp.status(404));
});
