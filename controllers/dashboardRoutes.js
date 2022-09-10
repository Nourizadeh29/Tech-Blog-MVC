const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// FIND ALL BLOGS WITH THEIR COMMENTS
router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id,
      },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'blog_id',
            'user_id',
            'created_at'
          ],
          include: {
            model: User,
            attributes: ['username', 'twitter', 'github']
          }
        },
        {
          model: User,
          attributes: ['username', 'twitter', 'github']
        },
      ],
    });

    // Serialize data in array so the template can read it

    const blogs = blogData.map(blog => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', {
      blogs,
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// FIND A BLOG AND EDIT
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findOne({
      where: {
        id: req.params.id,
      },
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
    if (!blogData) {
      res.status(404).json({ message: 'No Blog found with this id' });
      return;
    }
    // serialize
    const blog = blogData.get({ plain: true });
    res.render('edit-blog', {
      blog,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE BLOG
router.get('/create/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id,
      },
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
    const blogs = blogData.map(blog => blog.get({ plain: true }));
    res.render('create-blog', {
      blogs,
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
