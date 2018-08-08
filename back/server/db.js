const Mongo = require('mongodb').MongoClient
let url = "mongodb://localhost:27017/blog"

function _connectDB(callback) {
    Mongo.connect(url, function (err, db) {
        if(err) {
            callback(err,null)
            return
        }
        callback(err, db)
    })
}

exports.insertOne = function (data) {
    _connectDB(function (err, db) {
        db.collection("blog").insertOne(data, function (err, res) {
            if(err) throw err
            console.log('插入成功')
            db.close()
        })
    })
}

