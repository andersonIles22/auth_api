const express= require('express');
const { validateRegister } = require('../middleware/validation');
const authController = require('../controllers/authController');
const router=express.Router();

router.post('/register',validateRegister,authController.register)

module.exports={router};