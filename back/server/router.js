let formidable = require('formidable')
let db = require("../server/db.js")
let fs = require("fs")
let MongoClient = require('mongodb').MongoClient
let user = require('./admin').items

let identifyKey = 'skey'

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
    let session = req.session
    let user = findUser(req.body.name)
    
    if(user) {
        session.regenerate((err) => {
            if(err) throw err
            req.session.loginUser = user.name
            console.log('login receive')
            res.send()
        })
    }else{
        console.log('login error')
    }
}

exports.logout = function (req, res) {
    req.session.destroy((err) => {
        if (err) throw err
        res.clearCookie(identifyKey)
        console.log('logout success')
    })
    res.send()
}

exports.isLogin = function (req, res) { // 判断是否登录
    let session = req.session
    let user = session.loginUser
    let isLogin = !!user

    res.send(isLogin)
}