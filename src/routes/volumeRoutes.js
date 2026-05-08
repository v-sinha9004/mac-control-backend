const express = require('express');
const volumeController = require('../controllers/volumeController');
const authMiddleware = require('../middlewares/auth');
const { validateBody, setVolumeSchema, setMuteSchema } = require('../middlewares/validator');

const router = express.Router();

// Apply auth middleware to all volume routes
router.use(authMiddleware);

// Get volume info
router.get('/', volumeController.getVolume);

// Set volume
router.post('/', validateBody(setVolumeSchema), volumeController.setVolume);

// Increase volume by 1
router.post('/up', volumeController.increaseVolume);

// Decrease volume by 1
router.post('/down', volumeController.decreaseVolume);

// Set mute
router.post('/mute', validateBody(setMuteSchema), volumeController.setMute);

module.exports = router;
