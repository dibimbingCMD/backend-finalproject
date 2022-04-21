const db = require('../models');
const Club = db.club;

exports.findAll = (req, res) => {
    Club.find()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error while retrieving club."
        })
    });
}

exports.create = (req, res) => {
    const club = new Club({
        logo: req.body.logo,
        name: req.body.name,
    })
    
    club.save(club)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while create club."
        })
    });
}

exports.findOne = (req, res) => {
    const id = req.params._id

    Club.findById(id)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while show club."
        })
    });
}

exports.update = (req, res) => {
    const id = req.params._id

    Club.findByIdAndUpdate(id, req.body)
    .then((result) => {
        if (!result) {
            res.status(404).send({
                message: "club not found"
            })
        }
        res.send({
            message: "club was updated"
        })
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while update club."
        })
    });
}

exports.delete = (req, res) => {
    const id = req.params._id

    Club.findByIdAndRemove(id)
    .then((result) => {
        if (!result) {
            res.status(404).send({
                message: "club not found"
            })
        }
        res.send({
            message: "club was deleted"
        })
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while deleted club."
        })
    });
}