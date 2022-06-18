const productModel = require('../models/products.model');
const validationResult = require('express-validator').validationResult;
 

exports.getAdd = (req,res,next)=>{
    res.render('add-product',{
        pageTitle : 'Add Product',
        isUser : true,
        isAdmin : true,
        authError : req.flash('authError')[0],
        validationError : req.flash('validationError')
    })
}


exports.postAdd = (req,res,next)=>{
    if(validationResult(req).isEmpty()){
        productModel.addNewProduct({
            name : req.body.name,
            price : req.body.price,
            description : req.body.description,
            category : req.body.category,
            image : req.file.filename
        }).then(()=>{
            res.redirect('/')
        }).catch(err=>{
            console.log(err);
            req.flash('authError', err)
            res.redirect('/admin/add')
        })
    }else{
        req.flash('validationError' , validationResult(req).array());
        res.redirect('/admin/add')
    }
}