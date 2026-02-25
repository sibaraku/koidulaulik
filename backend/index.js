const express = require("express");
const sequelize = require("./config/db");
const articleRoutes = require("./routes/article.routes");

const app = express();
app.use(express.json());

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => console.log(err));

app.use("/articles", articleRoutes);

app.listen(3000, () => {
  console.log("Server started on port http://localhost:3000");
});