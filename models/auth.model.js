const mongoose = require('mongoose'); // import mongoose 
const bcrypt = require('bcrypt');  // import bcrypt to encrypt password
const db_url = "mongodb://localhost:27017/shop"; // database url to make connection with database
const userSchema = mongoose.Schema({  // create schema
    username : String,
    email : String,
    password : String,
    isAdmin : {
        type : Boolean,
        default : false,
    }
});

const User = mongoose.model('user',userSchema); // create model in database and collection users


// code to signup and create new account


exports.createAccount = (username ,email ,password)=>{  // function to create new user or function to manage user to register 
    return new Promise((resolve,reject)=>{
        mongoose.connect(db_url).then(()=>{
            return User.findOne({email:email})
        }).then((user)=>{
            if(user){
                mongoose.disconnect();
                reject('This email is already exist')
            }else{
                return bcrypt.hash(password, 10); 
            }
        }).then(hashedPassword=>{
            let user = new User({
                username : username,
                email : email,
                password : hashedPassword
            })
            return user.save()
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch(err=>{
            mongoose.disconnect();
            reject(err)
        })
    })
}


// code to login 

exports.loginToAccount = (email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(db_url).then(()=>{
            return User.findOne({email : email});
        }).then(user=>{
            if(!user){
                mongoose.disconnect();
                reject('Sorry , this user is not found');
            }else{
                bcrypt.compare(password , user.password).then(same=>{
                    if(!same){
                        mongoose.disconnect();
                        reject('Sorry , incorrect password !');
                    }else{
                        mongoose.disconnect();
                        resolve({
                          id :  user._id,
                          isAdmin : user.isAdmin
                        })
                    }
                })
            }
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}