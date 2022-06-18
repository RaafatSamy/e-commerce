const productModel = require('../models/products.model');


exports.getAll = (req,res,next)=>{
        // productModel.getAllProducts().then(products=>{
        //     res.render('index',{
        //         products : products
        //     })
        // })

    let category = req.query.category ;
    let validCategories = ['computers','phones','clothes','screens','t'];
    let productsPromise;
    if(category && validCategories.includes(category)) productsPromise = productModel.getProductsByCategory(category)
    else productsPromise = productModel.getAllProducts()
    productsPromise.then(products=>{
        res.render('index',{
            products : products,
            pageTitle : 'Home',
            isUser : req.session.userId,
            isAdmin : req.session.isAdmin,
            validationErrors : req.flash('validationErrors')[0],
        })
    })
  


}