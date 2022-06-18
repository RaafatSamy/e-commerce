const router = require('express').Router();
const bodyParser = require('body-parser').urlencoded({extended:true});
const authGuard = require('./guards/auth.guard');
const cartController = require('../controllers/cart.controller');
const check = require('express-validator').check;



router.get('/' , authGuard.isAuth , cartController.getCartProducts);


router.post('/', authGuard.isAuth, bodyParser ,
    check('amount').not().isEmpty().withMessage('Amount is required')
    .isInt({min:1}).withMessage('your amount must be greater than 1')
, cartController.addToCart);


   
router.post('/save' , authGuard.isAuth , bodyParser , 
    check('amount').not().isEmpty().withMessage(" you can't leave this input empty, enter your amount")
    .isInt({min:1}).withMessage('your amount must be greater than 1')
,cartController.editAmount );

router.post('/delete' , authGuard.isAuth , bodyParser , cartController.delete );

router.post('/delete-all' , authGuard.isAuth,bodyParser ,cartController.deleteAll)

module.exports = router