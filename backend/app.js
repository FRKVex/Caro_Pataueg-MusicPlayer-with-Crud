const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express()

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(consts.STATUS.OK).json({});
    }
    next();
})

let userRouter = require('./api/routers/userRouter')
app.use('/api', userRouter)

let songRouter = require('./api/routers/songRouter')
app.use('/api', songRouter)

app.use((error, req, res, next)=>{
    res.status(error.status || 500).json({
        message: error.message
    })
});

module.exports = app;