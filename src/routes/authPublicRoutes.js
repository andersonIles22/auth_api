const express= require('express');
const { validateRegister, validateLogin } = require('../middleware/validation');
const authController = require('../controllers/authController');

const router=express.Router();

router.post('/register',validateRegister,authController.register);
router.post('/login',validateLogin,authController.login);
console.log('PUBLIC ROUTES HIT:');

module.exports=router;