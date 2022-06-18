const productModel = require('../models/products.model');
const validationResult = require('express-validator').validationResult;

exports.getProduct = (req,res,next)=>{
    let id = req.params.id;
    productModel.getProductById(id).then((product)=>{
        res.render('product',{
            product : product,
            pageTitle : 'Product Details',
            isUser : req.session.userId,
            isAdmin : req.session.isAdmin,
            validationErrors : req.flash('validationErrors')[0]
            
        })
    })
};




exports.AddToCart = (req,res,next)=>{
    if(validationResult(req).isEmpty()){
        productModel.addToCartProduct({
            name : req.body.name,
            amount : req.body.amount,
            price: req.body.price,
            productId : req.body.productId,
            timestamp : Date.now()
    }).then(()=>{
        res.redirect('/cart')
    }).catch(err=>{
        console.log(err);
        res.redirect('/product')
    })
    }else{
        req.flash('validationErrors' , validationResult(req).array());
        res.redirect(req.body.redirectTo)
    }
}