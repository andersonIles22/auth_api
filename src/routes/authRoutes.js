const express = require('express');
const authController = require('../controllers/authController');
const { validateRegister, validateLogin,validateChangePassword} = require('../middleware/validation');
const  {authMiddleware} = require("../middleware/auth");
const {authorizeRoles}=require('../middleware/checkRole')

const router=express.Router();
router.post('/register',validateRegister,authController.register);
router.post('/login',validateLogin,authController.login);
router.post('/refresh-token',authController.refreshToken);

router.use(authMiddleware);
router.patch('/change-password',validateChangePassword,authController.changePassword);
router.get('/allDb',authorizeRoles('admin'),authController.getAll);

module.exports={router};