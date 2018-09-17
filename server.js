const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require("./config/config").get(process.env.NODE_ENV);

const PostRouter = require('./api/routes/posts');

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

const app = express();
app.use(bodyParser.json());

app.use("/api", PostRouter);


const PORT = process.env.PORT || 3851;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});