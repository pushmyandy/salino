let formidable = require('formidable')
let db = require("../server/db.js")
let fs = require("fs")
let MongoClient = require('mongodb').MongoClient
let user = require('./admin').items

let findUser = function(name) {
    return user.find( (item) => {
        return item.name === name
    } )
}

exports.subMes = function (req, res) {
    const data = req.body
    db.insertOne(data)
    res.send()
}

exports.getMes = function (req, res) {
    db.getData(res)
}

exports.login = function (req, res) {

}