const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/config").get(process.env.NODE_ENV);
const path = require('path');
const app = express();

const errorHandler = require('./api/middleware/errorHandler');
const PostRouter = require("./api/routes/posts");
const UserRouter = require("./api/routes/users");
const CommentRouter = require('./api/routes/comments');

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
app.use(express.static(path.resolve(__dirname, '../dist')))

app.use("/api/u", UserRouter);
app.use("/api/p", PostRouter);
// app.use('/api/comments', CommentRouter)

app.use((req, res, next) => {
  let err = new Error("Whoops! Looks like something went horribly, horribly wrong here!");
  err.status = 404;
  next(err);
});
app.use(errorHandler);

const PORT = process.env.PORT || 3851;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
