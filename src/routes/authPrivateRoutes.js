const express = require('express');
const authController=require('../controllers/authController')
const  authMiddleware = require("../middleware/auth");

const router=express.Router();

//router.use(authMiddleware);
router.get('/allDb',authController.getAll),
console.log('PRIVATE ROUTES HIT:', req.method, req.path);

module.exports=router;