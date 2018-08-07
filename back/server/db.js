const mongoose = require('mongoose')
let url = "mongodb://localhost:27017/blog"

const message = new mongoose.Schema({
    title: String,
    data: String,
    location: String
})

const Models = {
    Message: mongoose.model('Message', message)
}

module.exports = Models