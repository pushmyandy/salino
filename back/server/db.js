const Mongo = require('mongodb').MongoClient
let url = "mongodb://localhost:27017/blog"

function _connectDB(callback) {
    Mongo.connect(url, function (err, db) {
        if(err) {
            throw err
        }
        callback(err, db)
    })
}

exports.insertOne = function (data) {
    _connectDB(function (err, db) {
        let dbo = db.db('blog')
        dbo.collection("blog").insertOne(data,  (err, res) => {
            if(err) throw err
            console.log('插入成功')
            db.close()
        })
    })
}

exports.getData = function (res) {
    _connectDB(function (err, db) {
        let dbo = db.db('blog')
        dbo.collection("blog").find({}).toArray((err, result) => {
            if(err) throw err
            res.send(result)
            db.close()
        })
    })
}

