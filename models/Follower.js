const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Follower extends Model {}

Follower.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    following_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //key: 'id'
    },
    followed_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //key: 'id'
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'follower',
  }
);

module.exports = Follower;
