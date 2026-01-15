const express = require('express');
const authPublicRoutes=require('./authPublicRoutes');
const authPrivatRoutes=require('./authPrivateRoutes');

const router=express.Router();

router.use('/auth', authPublicRoutes);
router.use('/auth',authPrivatRoutes);
console.log('PUBLIC ROUTES HIT:', req.method, req.path);

module.exports=router;