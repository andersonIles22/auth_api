const express = require('express');
const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validation');
const  authMiddleware = require("../middleware/auth");

const router=express.Router();
router.post('/register', (req,res) => {
  res.json({ ok: true });
});
router.post('/login',(req,res) => {
  res.json({ ok: "wasap" });
});

//router.use(authMiddleware);
router.get('/allDb',authController.getAll);

module.exports=router;