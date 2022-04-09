const db = require('../models');
const Users = db.users;

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

exports.create = (req, res) => {
    const users = new Users({
        email: req.body.email,
        pass: req.body.pass,
        namaDepan: req.body.namaDepan,
        namaBelakang: req.body.namaBelakang,
        asal: req.body.asal,
        status: req.body.status,
    })
    
    users.save(users)
    .then((result) => {
        res.send(result)
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