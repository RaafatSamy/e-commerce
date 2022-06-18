const mongoose = require('mongoose') ; // import mongoose to save data in database
const db_url = "mongodb://localhost:27017/shop";  // database url to connect with mongodb database
const CartSchema = mongoose.Schema({
    name : String,
    price : Number,
    amount : Number,
    userId : String,
    productId : String,
    timestamp : Number,
});

const Cart = mongoose.model('cart', CartSchema);



exports.addNewItemToCart = data=>{
    return new Promise((resolve,reject)=>{
         mongoose.connect(db_url).then(()=>{
             let item = new Cart((data))
             return item.save();
         }).then(()=>{
             mongoose.disconnect();
             resolve()
         }).catch(err=>{
             mongoose.disconnect();
             reject(err);
         })
    })
}


exports.getCartData = (userId)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(db_url).then(()=>{
            return Cart.find({userId : userId},{},{sort : {timestamp : -1}}) // this code to sort data by timestamp
        }).then(products=>{
            mongoose.disconnect();
            resolve(products);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}



exports.editAmountInCart = (id , newData)=>{       
    return new Promise((resolve,reject)=>{
        mongoose.connect(db_url).then(()=>{
            return Cart.updateOne({ _id : id}, newData)
        }).then(products=>{
            mongoose.disconnect();
            reject(`Successfully Updated`)
            resolve(products);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err)
        })
    })

}


exports.deleteItemFromCart = (id)=>{
    return new Promise((resolve,reject)=>{
        mongoose,mongoose.connect(db_url).then(()=>{
            return Cart.findByIdAndDelete(id)
        }).then(()=>{
            mongoose.disconnect();
            resolve()
        }).catch(err=>{
            mongoose.disconnect();
            reject(err)
        })
    })
}


exports.deleteAllItems = ()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(db_url).then(()=>{
            return Cart.deleteMany()
        }).then((products)=>{
            mongoose.disconnect();
            resolve(products);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err)
        })
    })
}


