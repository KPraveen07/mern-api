const mongoose = require('mongoose')

const ItemsSchema = new mongoose.Schema({
    sn: Number,
    name: String,
    image: String,
    category: String,
    label: String,
    price: Number,
    description: String
})

const ItemsModel = mongoose.model("dishes", ItemsSchema)
module.exports = ItemsModel
