const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require("./config/config").get(process.env.NODE_ENV);
const app = express();


const PostRouter = require('./api/routes/posts')
const UserRouter = require('./api/routes/users')

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

app.use(bodyParser.json());

app.use("/api", PostRouter, UserRouter);


const PORT = process.env.PORT || 3851;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});