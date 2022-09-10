const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET api/users -- Find all users attributes

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ap/users/id -- Find a user by id
// with references to users blogs, comments, and comments on a blog title
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Blog,
          attributes: ['id', 'title', 'content', 'created_at'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: {
            model: Blog,
            attributes: ['title'],
          },
        },
      ],
    });
    if (!userData) {
      res.status(400).json({ message: 'No user found with this id' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// SIGNUP
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      // User inputs info at sign up page
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      github: req.body.github,
      twitter: req.body.twitter,
    });

    req.session.save(() => {
      // I think the user_id is generated no user input needed
      req.session.user_id = userData.id;
      // All user inputs saved
      req.session.username = userData.username;
      req.session.github = userData.github;
      req.session.twitter = userData.twitter;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      // I think the user_id is generated no user input needed
      req.session.user_id = userData.id;
      // All user inputs saved
      req.session.username = userData.username;
      req.session.github = userData.github;
      req.session.twitter = userData.twitter;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.status(200).json({ userData, message: 'You are logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE -- /api/users/1
router.put('/:id', withAuth, async (req, res) => {
  try {
    const userData = User.update(req.body, {
      // Will select records that are about to be updated and
      //  emit before- + after- Update on each instance
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const userData = User.destroy(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
