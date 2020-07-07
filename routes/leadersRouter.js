const express = require('express')
const bodyParser = require('body-parser')
const Leader = require('../models/leaders')
const authenticate = require('../authenticate')

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
.post(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    Leader.create(req.body)
    .then((Leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(Leader);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /leaders')
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
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
.post(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode = 403
    res.end('POST operation not supported on /leaderes/'+
     req.params.leaderId)
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
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
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    Leader.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err)=>next(err))
    .catch((err) => next(err))
})

module.exports = leadersRouter