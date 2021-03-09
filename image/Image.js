const mongoose = require('mongoose');


const Item = new mongoose.Schema({


    img:
        {
            data: Buffer,
            contentType: String,
            postid:String

        }

})


mongoose.model('images', Item);

module.exports = mongoose.model('images');