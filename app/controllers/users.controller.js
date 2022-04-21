const db = require('../models');
const Users = db.users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var payload = {}

exports.findAll = (req, res) => {
    Users.find()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error while retrieving user."
        })
    });
}


exports.create = async (req, res) => {
    const users = new Users({
        email: req.body.email,
        username: req.body.username,
        address: req.body.address,
        phone_number: req.body.phone_number,
        password: req.body.password,
    })
    const checkEmail = await Users.findOne({
        email: req.body.email
    })
    .then((result) => {
        if(result == null) {
            users.password = bcrypt.hashSync(req.body.password, 10);
            users.save(users)
            .then((result) => {
                res.send({result});
            }).catch((err) => {
                res.status(409).send({
                    message: err.message || "Some error while create user."
                })
            });
        }
        else {res.send({message: "Email already used."})}
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while create user."
        })
    });
}

exports.login = async (req, res) => {
    const user = await Users.findOne({
        email: req.body.email
    })
    
    .then((result) => {
        payload = {
            _id: result._id,
            email: result.email,
            username: result.username,
            address: result.address,
            phone_number: result.phone_number,
        }
        bcrypt.compare(req.body.password, result.password, function(err, result) {
            if (err) {res.status(409).send({
                message: err.message || "Some error while create user."
            })};
            if (result == true){

                const token = jwt.sign(payload, 'secret', {expiresIn: '1h'})

                return res.send({payload, message: 'Login Success.', token: token })
            }
            else {return res.status(400).send({ message: 'Phone number or password is invalid.'})}
    });
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while create user."
        })
    });
   
}

exports.findOne = (req, res) => {
    const id = req.params._id

    Users.findById(id)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while show user."
        })
    });
}

exports.update = (req, res) => {
    const id = req.params._id

    Users.findByIdAndUpdate(id, req.body)
    .then((result) => {
        if (!result) {
            res.status(404).send({
                message: "user not found"
            })
        }
        res.send({
            message: "user was updated"
        })
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while update user."
        })
    });
}

exports.delete = (req, res) => {
    const id = req.params._id

    Users.findByIdAndRemove(id)
    .then((result) => {
        if (!result) {
            res.status(404).send({
                message: "user not found"
            })
        }
        res.send({
            message: "user was deleted"
        })
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while deleted user."
        })
    });
}