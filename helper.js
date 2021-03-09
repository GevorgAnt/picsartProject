const jwt = require('jsonwebtoken');
const jwt_decode=require("jwt-decode")
const bcrypt = require('bcryptjs');

function verification(res,req) {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({message: "No token provided!"});
    }
    jwt.verify(token, process.env.Secret, (err) => {
        if (err) {
            return res.status(401).send({message: "Unauthorized!"});
        }
    })
}

exports.verification=verification