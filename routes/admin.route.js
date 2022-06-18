const router = require('express').Router();
const multer = require('multer');
const adminGuard = require('./guards/admin.guard');
const check = require('express-validator').check
const adminController = require('../controllers/admin.controller');

router.get('/add' , adminGuard , adminController.getAdd );


router.post('/add' , adminGuard, multer({
    storage : multer.diskStorage({
        destination : (req,file, cb)=>{
            cb(null , 'images');
        },
        filename : (req,file,cb)=>{
            cb(null , Date.now() +'-'+ file.originalname)
        }
    }) }).single('image'),
check('name').not().isEmpty().withMessage('Product name is required'),
check('price').not().isEmpty().withMessage('Product Price is required')
.isInt({min:1}).withMessage('not allow number'),
check('description').not().isEmpty().withMessage('Sorry , this field is required'),
check('category').not().isEmpty().withMessage('Must be choose product category'),
check('image').custom((value , {req})=>{
    if(req.file) return true
    else throw 'Product Image is required!'}) ,adminController.postAdd);


module.exports = router