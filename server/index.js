const express = require('express')
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const connect = () => {
    mongoose.connect(`mongodb://localhost:27017/food`)
        .then((res) => console.log(`mongodb connected`))
        .catch((err) => {
            console.log(`mongodb not connected`, err);
        });
}
const PostSchema = mongoose.Schema({
    title: String
})

const PostFood = mongoose.model("foodcollection", PostSchema);

const PORT = 8080;
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/get", (req, res) => {
    PostFood.find()
    .then((item)=>res.json(item))
    .catch((err)=>console.log(err))
})

app.post("/post", (req, res) => {
    PostFood.create({
        title: req.body.title
    })
})
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
    connect()
})