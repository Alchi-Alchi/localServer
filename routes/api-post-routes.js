const express = require('express');
const router = express.Router();
const {getPost, deletePost, editPost, getPosts, addPost} = require('../controllers/api-post-conroller');
// Get all posts
router.get('/api/posts', getPosts);
// Get post by ID
router.get('/api/post/:id', getPost);
// Update post by ID
router.put('/api/post/:id', editPost);
// Delete post by ID
router.delete('/api/post/:id', deletePost);
// Add new post
router.post('/api/post', addPost);
module.exports = router;