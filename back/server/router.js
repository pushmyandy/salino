const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('/api/main/salino', (req, res) => {
    new db.Message(req.body.form).save((err) => {
        if(err) {
            console.log(err)
            return
        }
        res.send()
    })
})
router.post('/submit', (req, res) => {
    new db.Message(req.body.form).save((err) => {
        if(err) {
            res.status(500).send()
            return
        }
        res.send()
    })
})