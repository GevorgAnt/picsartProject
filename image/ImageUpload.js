const express = require('express');
const router = express.Router();
const img=require("./Image")
const multer = require('multer');
const fs = require("fs");
const verify = require("../helper")

//const upload = multer({dest:'uploads/'}).single("demo_image");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

router.post('/addImage', function (req, res) {
    verify.verification(res, req)

    let newItem = new img();
    newItem.img.data = fs.readFileSync(req.body.path)
    newItem.img.contentType = req.body.name;
    newItem.img.postid=req.body.postId
    newItem.save().then((result) => {
        res.send(result);
    });
    console.log(req.file);
    res.end('upload file success');
    console.log('success');;
});
module.exports = router;