const express = require('express');
const BlogRouter = express.Router();
const Blog = require('../models/Blog.model');
const {auth} = require('../Middleware/auth');

BlogRouter.use(auth)

// Create a new blog post
BlogRouter.post('/blogs', async (req, res) => {
  try {
    // Get user information from the authenticated user
    const user = req.userId;
    // Extract blog details from the request body
    const { title, content, category } = req.body;

    // Create a new blog post
    const blog = new Blog({
      title,
      content,
      category,
      user: user, // Associate the blog with the logged-in user
    });

    // Save the blog post to the database
    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
console.log(error)
    res.status(500).json({ error: 'Failed to create a new blog post.' });
  }
});



BlogRouter.get('/blogs', async (req, res) => {
    try {
      // Define the query parameters
      const { title, category, sort, order } = req.query;
      const conditions = {};
  
      if (title) {
        conditions.title = new RegExp(title, 'i'); // Case-insensitive search
      }
  
      if (category) {
        conditions.category = category;
      }
  
      const sortOptions = {};
      if (sort) {
        sortOptions[sort] = order === 'desc' ? -1 : 1; // Sort in descending order if order is 'desc'
      }
 //  console.log(conditions)
      // Fetch blogs based on the conditions and sorting
      const blogs = await Blog.find(conditions).sort(sortOptions);
      res.json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });


  BlogRouter.put('/blogs/:id', async (req, res) => {
    try {
      const { title, content, category } = req.body;
      const blog = await Blog.findById(req.params.id);
  
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
     
      blog.title = title || blog.title;
      blog.content = content || blog.content;
      blog.category = category || blog.category;
  
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });


  
BlogRouter.delete('/blogs/:id', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
  
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      
      await blog.deleteOne();
      res.json({ message: 'Blog removed' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

 
BlogRouter.put('/blogs/:id/like', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
  
      if (blog==[]) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      
 console.log(blog,req.params.id)
      blog.likes.push({ User: req.userId });
      await blog.save();
      res.json(blog);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  });


  // @route   PUT/PATCH /api/blogs/:id/comment
// @desc    Comment on a blog by ID
// @access  Private (requires authentication)
BlogRouter.put('/blogs/:id/comment', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
  
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      const { text } = req.body;
      const newComment = {
        User: req.userId,
        text
        
      };
  
      blog.comments.push(newComment);
      await blog.save();
      res.json(blog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  
  

module.exports = {BlogRouter};
