const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET REQUEST FOR ALL COMMENTS
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({});
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// SESSIONS
router.post('/', withAuth, async (req, res) => {
  try {
    console.log('HERE')
    const checkSession = await Comment.create({
      comment_text: req.body.comment_text,
      blog_id: req.body.blog_id,
      // Using the id from session
      user_id: req.session.user_id,
    });
    res.status(200).json(checkSession);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteComment) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(deleteComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
