const express = require('express');
const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validation');
const  {authMiddleware} = require("../middleware/auth");

const router=express.Router();

router.get('/register',validateRegister,authController.register);
router.post('/login',validateLogin,authController.login);

router.get('/message',validateRegister,authController.getSomethin);
router.get('/users',authController.postSomethin);
//router.use(authMiddleware);
router.get('/allDb',authMiddleware,authController.getAll);

module.exports={router};