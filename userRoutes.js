const express = require('express');
const { createCard, getAllCards, updateCard, getCardById } = require('./userController');
const authenticateToken = require('./auth');

const router = express.Router();

router.post('/cards', createCard);
router.get('/cards', getAllCards);
router.put('/cards-update', authenticateToken, updateCard);
router.get('/cards/:id', getCardById); // New route for fetching a card by ID

module.exports = router;
