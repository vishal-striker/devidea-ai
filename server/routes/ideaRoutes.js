const express = require('express');
const router = express.Router();
const {
  generateIdea,
  saveIdea,
  getIdeas,
  deleteIdea
} = require('../controllers/ideaController');

// @route   POST /api/ideas/generate
// @desc    Generate a new project idea
// @access  Public
router.post('/generate', generateIdea);

// @route   POST /api/ideas/save
// @desc    Save an idea to database
// @access  Public
router.post('/save', saveIdea);

// @route   GET /api/ideas
// @desc    Get all saved ideas
// @access  Public
router.get('/', getIdeas);

// @route   DELETE /api/ideas/:id
// @desc    Delete an idea
// @access  Public
router.delete('/:id', deleteIdea);

module.exports = router;

