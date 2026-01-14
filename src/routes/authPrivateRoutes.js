const express = require("express");
const { router } = require("./authPublicRoutes");
const authController=require('../controllers/authController')
const { protect } = require("../middleware/auth");

const router=express.Router();

router.use(protect);
router.get('/allDb',authController.getAll),

module.exports=router;