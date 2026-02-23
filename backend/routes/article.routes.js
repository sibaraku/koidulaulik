const express = require("express");
const router = express.Router();
const Article = require("../models/Article");


router.get("/", async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
