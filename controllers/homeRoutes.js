const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// FIND ALL BLOGS AND JOIN WITH COMMENT & USER ATTRIBUTES
router.get('/', async (req, res) => {
  try {
    console.log(req.session);
    const blogData = await Blog.findAll({
      attributes: ['id', 'title', 'created_at', 'content'],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'blog_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username', 'twitter', 'github'],
          },
        },
        {
          model: User,
          attributes: ['username', 'twitter', 'github'],
        },
      ],
    });

    // Serialize data in array so the template can read it

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // This is the withAuth spelled out
  console.log(req.session);
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// SIGNUP
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

router.get('/blogs/:id', async (req, res) => {
  try {
    const blogData = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'title', 'created_at', 'content', 'user_id'],

      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'blog_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username', 'github', 'twitter'],
          },
        },
        {
          model: User,
          attributes: ['username', 'github', 'twitter'],
        },
      ],
    });
    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id' });
      return;
    }

    // serialize the data
    const blog = blogData.get({ plain: true });

    // pass data to template
    res.render('single-comment', {
      blog,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
