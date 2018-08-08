let formidable = require('formidable')
let db = require("../server/db.js")
let fs = require("fs")
let MongoClient = require('mongodb').MongoClient

exports.subMes = function (req, res) {
    const data = req.body.message
    db.insertOne(data)
    res.send()
}