const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const router = require('./server/router')

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})
//app.get('/getMes',router.getMes)
app.post('/subMes',router.subMes)

app.listen(3000, function () {
    console.log('访问地址为 localhost:3000')
})