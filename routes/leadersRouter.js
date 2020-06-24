const express = require('express')
const bodyParser = require('body-parser')
const Leader = require('../models/leaders')

const leadersRouter = express.Router();

leadersRouter.use(bodyParser.json())

leadersRouter.route('/')
.get((req,res) => {
    Leader.find({})
    .then((Leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(Leaders);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req,res,next) => {
    Leader.create(req.body)
    .then((Leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(Leader);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req,res,next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /leaders')
})
.delete((req,res,next) => {
    Leader.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err)=>next(err))
    .catch((err)=>nexr(err))
})

leadersRouter.route('/:leaderId')
.get((req,res) => {
    Leader.findById(req.params.leaderId)
    .then((Leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(Leader);

    }, (err) => next(err))
    .catch((err)=>next(err))
})
.post((req,res,next) => {
    res.statusCode = 403
    res.end('POST operation not supported on /leaderes/'+
     req.params.leaderId)
})
.put((req,res,next) => {
    Leader.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((Leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Leader);
    }, (err)=>next(err))
    .catch((err) => next(err))
})
.delete((req,res,next) => {
    Leader.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err)=>next(err))
    .catch((err) => next(err))
})

module.exports = leadersRouter