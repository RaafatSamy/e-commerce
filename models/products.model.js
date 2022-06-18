const mongoose = require('mongoose');
const db_url = "mongodb://localhost:27017/shop";
const productSchema = mongoose.Schema({
    name : String,
    price : Number,
    category : String,
    description : String,
    image : String,
});

const Product = mongoose.model('product' , productSchema);

exports.getAllProducts = ()=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(db_url).then(()=>{
            return Product.find();
        }).then(products=>{
            mongoose.disconnect();
            resolve(products);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}



exports.addNewProduct = (data)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(db_url).then(()=>{
            let product = new Product((data));
            return product.save()
        }).then(()=>{
            mongoose.disconnect();
            resolve()
        }).catch(err=>{
            mongoose.disconnect();
            reject(err)
        })
    })
}


exports.getProductsByCategory = (category)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(db_url).then(()=>{
            return Product.find({category : category})
        }).then(products=>{
            mongoose.disconnect();
            resolve(products);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err)
        })
    })
}


exports.getProductById = (id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(db_url).then(()=>{
            return Product.findById(id)
        }).then((product)=>{
            mongoose.disconnect()
            resolve(product)
        }).catch(err=>{
            mongoose.disconnect();
            reject(err)
        })
    })
}





exports.addToCartProduct = (data)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(db_url).then(()=>{
            let item = new Product((data))
            return item.save()
        }).then(()=>{
            mongoose.disconnect();
            resolve()
        }).catch(err=>{
            mongoose.disconnect();
            reject(err)
        })
    })
}