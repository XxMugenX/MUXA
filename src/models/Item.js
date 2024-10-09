const mongoose = require('mongoose')

const schema = mongoose.Schema

const CategorySchema = new schema ({
    CategoryName : {
        type : String, 
        required : true  
    }
})

const SizeSchema = new schema ({
    SizeValue : {
        type : String, 
        required : true
    }
})

const SystemRequirementSchema = new schema ({
    SystemRequirement : {
        type : String, 
        required : true
    }

})

const ProductEntrySchema = new schema({
    ProductId : mongoose.SchemaTypes.ObjectId,
    CategoryId : mongoose.SchemaTypes.ObjectId,
    SizeId : mongoose.SchemaTypes.ObjectId,
    SystemRequirementId : mongoose.SchemaTypes.ObjectId,
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
    },
    ProductImageAlternative : {
        type : String,
        required : true
    }
},
//correct this code, to replace the product image with the atl if the product image is not available
//ordo it from the
    if (ProductImage === Null) {
        ProductImage = ProductImageAlternative
    }
)

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
const SystemRequirement = mongoose.model('SystemRequirement', SystemRequirementSchema);



module.exports = [Product, ProductEntry, Category, Size, SystemRequirement];

