const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Post = require('./Post');
const User = require('../users/User');
const jwt = require('jsonwebtoken');
const jwt_decode = require("jwt-decode")
const bcrypt = require('bcryptjs');
const verify = require("../helper")

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/post', function (req, res) {

    let token = req.headers["x-access-token"];

    verify.verification(res, req)
    let userId = jwt_decode(token)
    Post.create({
            text: req.body.text,
            description: req.body.description,
            userid: userId.id

        },
        function (err, post) {
            if (err) return res.status(500).send("There was a problem adding a post.")


            /*  User.findOneAndUpdate({_id:userId},{name:"updatedvalue"},{useFindAndModify:true},function (err,updateData){
                  console.log(updateData)
              })*/


            //user.save()
            res.status(200).send({add: true});
        })


});
//})


router.get('/getPosts', function (req, res) {

    let token = req.headers["x-access-token"];
    verify.verification(res, req)
    let userId = jwt_decode(token).id
    Post.find({userid: userId}, function (err, posts) {
        //console.log(posts)
        res.status(200).send(posts);


    });
})

router.put('/updatePosts', function (req, res) {

    let token = req.headers["x-access-token"];
    let postId = req.body.postId
    verify.verification(res, req)
    let userId = jwt_decode(token).id
    Post.findByIdAndUpdate({postId},
        {
            text: req.body.text,
            description: req.body.description,
            userid: userId.id
        })
})

router.put('/findPost', function (req, res) {


    let postId = req.body.postId
    verify.verification(res, req)

    Post.find({_id: postId}, function (err, posts) {
        if(err)
            res.status(401).send("Problem encountered finding a post")
        //console.log(posts)
        res.status(200).send(posts);


    });

})

router.get('/getAllPosts', function (req, res) {


    Post.find({}, function (err, posts) {
        //console.log(posts)
        res.status(200).send(posts);


    });
})

router.delete('/PostDelete', function (req, res) {
    let postId = req.body.postId
    User.findByIdAndRemove(postId, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the post.");
        res.status(200).send("post:  was deleted.");
    });
});



module.exports = router;