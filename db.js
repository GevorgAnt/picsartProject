const mongoose = require('mongoose');
const dotenv=require("dotenv").config()
mongoose.connect(process.env.URI, { useNewUrlParser: true , useUnifiedTopology: true }).then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error("Connection error", err));

