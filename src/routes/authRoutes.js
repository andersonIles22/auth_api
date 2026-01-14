const express= require('express');
const { validateRegister, validateLogin } = require('../middleware/validation');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const router=express.Router();

router.post('/register',validateRegister,authController.register);
router.post('/login',validateLogin,authController.login);

router.use(protect);
router.get('/allDb',authController.getAll);
module.exports={router};