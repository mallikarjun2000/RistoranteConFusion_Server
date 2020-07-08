const express = require('express')
const bodyParser = require('body-parser')
const Promotion = require('../models/promotions');
const authenticate = require('../authenticate');
const cors = require('./cors');
const promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json())

promotionsRouter.route('/')
.options(cors.corsWithOptions, (req,ers) => { res.sendStatus(200); })
.get(cors.cors,(req,res) => {
    Promotion.find({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    Promotion.create(req.body)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /promotions')
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    Promotion.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err)=>next(err))
    .catch((err)=>nexr(err))
})

promotionsRouter.route('/:promotionId')
.options(cors.corsWithOptions, (req,ers) => { res.sendStatus(200); })
.get(cors.cors,(req,res) => {
    Promotion.findById(req.params.promotionId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(promotion);

    }, (err) => next(err))
    .catch((err)=>next(err))
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    res.end('POST operation not supported on /promotiones/'+
     req.params.promotionId)
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    Promotion.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, { new: true })
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err)=>next(err))
    .catch((err) => next(err))
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    Promotion.findByIdAndRemove(req.params.promotionId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err)=>next(err))
    .catch((err) => next(err))
})

module.exports = promotionsRouter