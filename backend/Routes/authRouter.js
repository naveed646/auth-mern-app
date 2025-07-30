const { login, singup } = require('../Controllers/authController');
const{signupValidation, loginValidation} =require('../Middlewares/authmidleware')

const router = require('express').Router();

router.post('/login',loginValidation, login);
router.post('/signup', signupValidation, singup);

module.exports=router;