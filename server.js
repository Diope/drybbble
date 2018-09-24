const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/config").get(process.env.NODE_ENV);
const app = express();

const PostRouter = require("./api/routes/posts");
const UserRouter = require("./api/routes/users");

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Authorization, Content-Type, Accept"
  );
  next();
});

app.use("/api", UserRouter, PostRouter);

const PORT = process.env.PORT || 3851;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
