const express = require('express');
const { Register, Login, PrivateController } = require('../controllers/AuthController');
const Protect = require('../middleWere/AuthMiddleWere');

const router = express.Router()

// Register Route
// Access : public
// EndPoint : /api/user/register
// Method : post
router.post("/register", Register)

// Login Route
// Access : public
// EndPoint : /api/user/login
// Method : post
router.post("/login", Login)

// Private Route
// Access : public
// EndPoint : /api/user/private
// Method : post
router.post("/private", Protect, PrivateController)

module.exports = router