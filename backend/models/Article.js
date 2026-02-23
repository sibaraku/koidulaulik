const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Article = sequelize.define("Article", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  image_url: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING
  },
  pubdate: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.TEXT
  },
  source: {
    type: DataTypes.STRING
  }
});

module.exports = Article;