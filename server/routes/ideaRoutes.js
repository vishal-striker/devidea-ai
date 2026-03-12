const express = require('express');
const router = express.Router();
const {
  generateIdea,
  saveIdea,
  getIdeas,
  deleteIdea
} = require('../controllers/ideaController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/ideas/generate
// @desc    Generate a new project idea
// @access  Public
router.post('/generate', generateIdea);

// @route   POST /api/ideas/save
// @desc    Save an idea to database
// @access  Private
router.post('/save', authMiddleware, saveIdea);

// @route   GET /api/ideas
// @desc    Get current user's saved ideas
// @access  Private
router.get('/', authMiddleware, getIdeas);

// @route   DELETE /api/ideas/:id
// @desc    Delete current user's idea
// @access  Private
router.delete('/:id', authMiddleware, deleteIdea);

module.exports = router;

