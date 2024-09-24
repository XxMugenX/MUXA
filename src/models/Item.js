const mongoose = require('mongoose')

const schema = mongoose.Schema

const ItemSchema = new schema({
    ItemName: {type: String, required : true},
    Description: {type: String, required: true},
    Genre: [{type: String, required: true}, {type: String}],
    //stock keeping units
    SKUs:[{
        SKU: {type: String, required: true},
        Price: { type: Number, required: true, 
                currency: {type: String, maxlength:3}},
        Quantity: {type: Boolean, required: true}
    }],
    Owner: {type: String, required: true}
}, 
{collection: "Inventory"})

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item;

