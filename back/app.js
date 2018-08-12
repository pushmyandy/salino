const express = require('express')
const session = require('express-session')
const filestore = require('session-file-store')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')
const path = require('path')
const router = require('./server/router')

let identifyKey = 'key'

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: true })

app.use(jsonParser)
app.use(urlencodedParser)

app.use(session({
    name: identifyKey,
    secret: 'caldey',
    store: new filestore(),
    saveUninitialized: false, // 是否保存未初始化的会话
    resave: false, // 是否每次重新保存会话,
    cookie: {
        maxAge: 10 * 1000
    }
}))

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})
app.get('/getMes', router.getMes)
app.post('/subMes', router.subMes)
app.post('/login', router.login)
app.get('/logout', router.logout)

app.listen(3000, function () {
    console.log('访问地址为 localhost:3000')
})