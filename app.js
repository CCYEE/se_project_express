const { PORT = 3001 } = process.env;
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use((req, res, next) => {
  req.user = {
    _id: "6484cd87755ff5940b282596",
  };
  next();
});

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
