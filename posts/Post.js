const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    text: String,
    description: String,
   userid:String
});
mongoose.model('posts', PostSchema);

module.exports = mongoose.model('posts');