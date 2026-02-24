const express = require("express");
const sequelize = require("./config/db");
const Article = require("./models/Article");

require("dotenv").config();

const app = express();
app.use(express.json());

const articleRoutes = require("./routes/article.routes");
app.use("/articles", articleRoutes);

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => console.log(err));

app.listen(3000, () => {
  console.log("Server started on port http://localhost:3000");
});