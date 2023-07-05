const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const followerRoutes = require('./followerRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/followers', followerRoutes);

module.exports = router;
