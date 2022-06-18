const router = require('express').Router();
const bodyParser = require('body-parser').urlencoded({extended:true});
const authController = require('../controllers/auth.controller');
const check = require('express-validator').check;
const  authGuard = require('./guards/auth.guard');

router.get('/signup' ,authGuard.notAuth ,authController.getSignup ); 

router.post('/signup', authGuard.notAuth ,bodyParser , 
    check('username').not().isEmpty().withMessage('Username is required'),
    check('email').not().isEmpty().withMessage('E-mail is required')
    .isEmail().withMessage('Sorry , you must enter  your email only in this input'),
    check('password').not().isEmpty().withMessage('Password is required')
    .isLength({min:6}).withMessage('Sorry , your password is short , valid password must be greater than 6 chracters'),
    check('confirmPassword').custom((value, {req})=>{
        if(value === req.body.password) return true
        else throw 'passwords is not matches!'
    })
,authController.postSignup);

router.get('/login', authGuard.notAuth ,authController.getLogin);

router.post('/login',authGuard.notAuth ,bodyParser ,
    check('email').not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must Enter your email only'),
    check('password').not().isEmpty().withMessage('Password is required')
,authController.postLogin );


router.post('/logout' , authGuard.isAuth ,authController.logout);  // we use (all) method to let user write logout in link 


module.exports = router