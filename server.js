// server.js

const express = require('express');
const mongoose = require('mongoose');
const {UserRouter} = require("./routers/User.Router")
const {BlogRouter} = require("./routers/Blog.Router")
const cors = require("cors")
const app = express();
require("dotenv").config()
const port = process.env.PORT || 9000;


const dbURI = process.env.DB;
app.use(cors())
app.use(express.json());

app.use("/user/api",UserRouter)
app.use("/api",BlogRouter)



mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
