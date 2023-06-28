const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use((req, res, next) => {
  req.user = {
    _id: "649baed9821f67c8620f816cnpxeslint",
  };
  next();
});

const routes = require("./routes");
app.use(express.json());
app.use(routes);
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
