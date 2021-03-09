const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../users/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', function(req, res) {

    let hashedPassword = bcrypt.hashSync(req.body.password, 8);

    /*let token = jwt.sign({ email: req.body.email }, process.env.Secret, {
        expiresIn: 3600 // expires in 1 hours

    });*/

    User.create({

            name : req.body.name,
            email : req.body.email,
            password : hashedPassword,



        },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem registering the user.")


            res.status(200).send({ auth: true });


        });
});
router.post('/login', function(req, res) {



    User.findOne({email: req.body.email}).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (!user) {
            return res.status(404).send({message: "User Not found."});
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        let token = jwt.sign({ id: user._id }, process.env.Secret, {
            expiresIn: 3600
        })// expires in 1 hours

        user.update(

        )
        res.status(200).send({
                id: user._id,
                name: user.name,
                email: user.email,
                accessToken: token
            });


    });

})
router.get('/me', function(req, res) {
    let token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.Secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        User.findById(decoded.id, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

            res.status(200).send(user);
        });
    });
});




    module.exports = router;