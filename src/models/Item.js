const mongoose = require('mongoose')

const schema = mongoose.Schema

const CategorySchema = new schema ({
    CategoryName : {
        type : String
    }
})

const SizeSchema = new schema ({
    SizeValue : {
        type : String
    }
})

const ProductEntrySchema = new schema({
    ProductId : mongoose.SchemaTypes.ObjectId,
    CategoryId : mongoose.SchemaTypes.ObjectId,
    SizeId : mongoose.SchemaTypes.ObjectId,
    Sku : _id,//holds the _id of the individual entry
    Price : {
        type : Number, 
        required : true
    },
    Quantity : {
        type : Number, 
        required : true
    },
    ProductImage : {
        type : String
    }
})

const ProductSchema = new schema({
    ProductName : {
        type : String, 
        required : true
    },
    Description : {
        type : String, 
        required : true
    },
    /*Seller : mongoose.SchemaTypes.ObjectId,*/
    CreatedAt : {
        type : Date, 
        immutable : true, 
        default : () => Date.now
    }
}, 
{collection: "Products"})


const Product = mongoose.model('Product', ProductSchema);
const ProductEntry = mongoose.model('ProductEntry', ProductEntrySchema);
const Category = mongoose.model('Category', CategorySchema);
const Size = mongoose.model('Size', SizeSchema);



module.exports = [Product, ProductEntry, Category, Size];

