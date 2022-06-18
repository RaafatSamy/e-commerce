const cartModel = require('../models/cart.model');
const validationResult = require('express-validator').validationResult;

    exports.addToCart = (req,res,next)=>{
        
            if(validationResult(req).isEmpty()){
                cartModel.addNewItemToCart({
                    name : req.body.name,
                    price : req.body.price,
                    amount : req.body.amount,
                    userId : req.session.userId,
                    productId : req.body.productId,
                    timestamp : Date.now(),
                }).then(()=>{
                    res.redirect('/cart')
                }).catch(err=>{
                    console.log(err);
                    
                })
            }else{
                req.flash('validationErrors' , validationResult(req).array());
                res.redirect(req.body.redirectTo);
            }
          
        }
    


    exports.getCartProducts = (req,res,next)=>{
        cartModel.getCartData(
                req.session.userId
            ).then((products)=>{   
                res.render('cart',{
                    products : products,
                    pageTitle : 'Cart',
                    isUser : true,
                    isAdmin : req.session.isAdmin,
                    validationErrors : req.flash('validationErrors')[0] ,
                    flashError : req.flash('flashError')[0]
                })
            }).catch(err=>{
                console.log(err);
              
            })
    }



exports.editAmount = (req,res,next)=>{
    if(validationResult(req).isEmpty()){
            cartModel.editAmountInCart(req.body.cartId , {amount : req.body.amount , timestamp : Date.now() }).then(()=>{
                res.redirect('/cart')
    }).catch(err=>{
                console.log('Error while Edit '+ err);
                req.flash('flashError' , err) 
                res.redirect('/cart')              
            })
    }else{
        req.flash('validationErrors' , validationResult(req).array());
        res.redirect('/cart')
    }
}



exports.delete = (req,res,next)=>{
    cartModel.deleteItemFromCart(req.body.cartId).then(()=>{
        res.redirect('/cart');
    }).catch(err=>{
        console.log('Error with Delete item ' + err)
    })
}


exports.deleteAll = (req,res,next)=>{
    cartModel.deleteAllItems().then(()=>{
        res.redirect('/cart');
    }).catch(err=>{
        console.log(err);
        res.redirect('/cart')
    })
}


