const sequelize = require('../config/connection');
const { User, Post, Follower } = require('../models');
const db = require("../config/connection");

const userData = require('./userData.json');
const postData = require('./postData.json');
const followerData = require('./followerData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // const followers = Follower.bulkCreate(followerData, {
  //   individualHooks: true,
  //   returning: true,
  // });
  await Follower.bulkCreate(followerData, {
    individualHooks: true,
    returning: true,
  });


  // db.query(`USE chirper_db`, 
  //   (err, results) => {
  //   console.log(err);
  //   console.log(results);
  // })

  // db.query(`CREATE TABLE follower (
  //   followed_user int,
  //   following_user int
  //   );`, 
  //   (err, results) => {
  //   console.log(err);
  //   console.log(results);
  // })

  // db.query(`INSERT INTO follower (user_id, followed_user_id) VALUES (${2}, ${1});`, (err, results) => {
    
  // })



  process.exit(0);
};

seedDatabase();
