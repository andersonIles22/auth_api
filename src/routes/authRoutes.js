const express = require('express');
const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validation');
const  authMiddleware = require("../middleware/auth");

const router=express.Router();
router.post('/register',validateRegister,authController.register);
router.post('/login',validateLogin,authController.login);

router.use(authMiddleware);
router.get('/allDb',authController.getAll);

module.exports=router;