const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { addAdmin } = require('../controllers/adminController'); 
const authenticateAdmin = require('../middleware/authenticateAdmin');
const {
  getPosts,
} = require('../controllers/postController');

// Get all admins
router.get('/admins', authenticateAdmin, async (req, res) => {
  try {
    const admins = await adminController.getAdmins(req, res);
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new admin (requires secret key)
router.post('/add-admin', authenticateAdmin, addAdmin);

// Remove an admin
router.delete('/admins/:id', authenticateAdmin, async (req, res) => {
  try {
    const response = await adminController.removeAdmin(req, res);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/users', authenticateAdmin, async (req, res) => {
  try {
    const users = await adminController.getAllUsers(req, res);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all posts
router.get('/posts', authenticateAdmin,  getPosts);
  
   

// Delete a user
router.delete('/users/:id', authenticateAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    await adminController.deleteUser(req, res);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a post
router.delete('/posts/:id', authenticateAdmin, async (req, res) => {
  try {
    const postId = req.params.id;
    await adminController.deletePost(req, res);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;