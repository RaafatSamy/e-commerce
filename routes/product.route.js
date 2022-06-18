const router = require('express').Router();
const productController = require('../controllers/product.controller');
const check = require('express-validator').check;
const authGuard = require('./guards/auth.guard');


router.get('/:id' , productController.getProduct );


router.post('/' ,authGuard.isAuth , 
check('amount').not().isEmpty().withMessage('Amount is required')
.isInt({min:1}).withMessage('amount must be greater than 1'), productController.AddToCart)

module.exports = router