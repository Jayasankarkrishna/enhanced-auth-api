// routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
// const authMiddleware = require('../middlewares/authMiddleware');

router.get('/profile',  getProfile);
router.put('/profile',  updateProfile);

module.exports = router;
