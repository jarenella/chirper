const router = require('express').Router();
const { Follower } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const newFollower = await Follower.create({
        ...req.body,
        following_user_id: req.session.user_id,
      });
  
      res.status(200).json(newFollower);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const followerData = await Follower.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!followerData) {
        res.status(404).json({ message: 'No follower found with this id!' });
        return;
      }
  
      res.status(200).json(followerData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;