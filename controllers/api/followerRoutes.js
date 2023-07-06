const router = require('express').Router();
const { Follower } = require('../../models');

router.post('/', async (req, res) => {
  try {
    //if the follow already exists, don't create a new follow
    const alreadyFollowed = await Follower.findOne({
      where: {
        following_user_id: req.body.following_user_id,
        followed_user_id: req.body.followed_user_id,
      }
    })

    if (alreadyFollowed) {
      console.log("------------\nUser already followed");
      res.status(400).send("User already followed")
    } 
    else {
      console.log("------------\nFollowing user");

      const newFollower = await Follower.create({
        ...req.body,
        following_user_id: req.session.user_id,
      });
  
      res.status(200).json(newFollower);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:followeduUserId', async (req, res) => {
  try {
    const followerData = await Follower.destroy({
      where: {
        followed_user_id: req.params.followeduUserId,
        following_user_id: req.session.user_id,
      },
    });

    if (!followerData) {
      res.status(404).json({ message: 'No follower found with this id!' });
      return;
    }

    res.status(200).json(followerData);
  } catch (err) {
    console.error("----------------------------\n" + err);
    res.status(500).json(err);
  }
});
  
  module.exports = router;