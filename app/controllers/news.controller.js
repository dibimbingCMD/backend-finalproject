const req = require('express/lib/request');
const db = require('../models');
const News = db.news;

exports.findAll = (req, res) => {
    News.find()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error while retrieving news."
        })
    });
}

exports.create = (req, res) => {
    const image = req.file.path;
    const news = new News({
        image: image,
        title: req.body.title,
        body: req.body.body,
        category: req.body.category,
        club: req.body.club,
        createdBy: req.params._id
    })
    
    news.save(news)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while create news."
        })
    });
}

exports.findOne = (req, res) => {
    const id = req.params._id

    News.findById(id)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while show news."
        })
    });
}

exports.searchNews = (req, res) => {

    const search = req.body.searchKeyword
    
    News.find({
        $or: [
            {'title': {'$regex': search}},
            {
            $or: [
                {'body': {'$regex': search}},
                {
                $or: [
                    {'category': {'$regex': search}},
                    {'club': {'$regex': search}}
                ]}
            ]}
        ]
    })
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while show news."
        })
    });
}

exports.findUser = (req, res) => {
    const id = req.params._id

    News.find({createdBy: id})
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while show news."
        })
    });
}

exports.update = (req, res) => {
    const id = req.params._id

    News.findByIdAndUpdate(id, req.body)
    .then((result) => {
        if (!result) {
            res.status(404).send({
                message: "news not found"
            })
        }
        res.send({
            message: "news was updated"
        })
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while update news."
        })
    });
}

exports.delete = (req, res) => {
    const id = req.params._id

    News.findByIdAndRemove(id)
    .then((result) => {
        if (!result) {
            res.status(404).send({
                message: "news not found"
            })
        }
        res.send({
            message: "news was deleted"
        })
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while deleted news."
        })
    });
}