const Article = require("../models/Article");

exports.getAllArticles = async (req, res) => {
  try {
    let { sortBy, order } = req.query;

    if (!sortBy) sortBy = "createdAt";
    if (!order || !["ASC", "DESC"].includes(order.toUpperCase())) order = "DESC";

    const articles = await Article.findAll({
      order: [[sortBy, order.toUpperCase()]],
    });

    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLatestArticle = async (req, res) => {
  try {
    const article = await Article.findOne({
      order: [["createdAt", "DESC"]],
    });

    if (!article) {
      return res.status(404).json({ message: "No articles found" });
    }

    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};