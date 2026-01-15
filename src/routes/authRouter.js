const express = require('express');
const authPublicRoutes=require('./authPublicRoutes');
const authPrivatRoutes=require('./authPrivateRoutes');

const router=express.Router();

router.use('/auth',authPrivatRoutes);
router.use('/auth', authPublicRoutes);

module.exports=router;