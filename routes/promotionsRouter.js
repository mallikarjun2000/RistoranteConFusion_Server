const express = require('express')
const bodyParser = require('body-parser')
const Promotion = require('../models/promotions');

const promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json())

promotionsRouter.route('/')
.get((req,res) => {
    Promotion.find({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req,res,next) => {
    Promotion.create(req.body)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req,res,next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /promotions')
})
.delete((req,res,next) => {
    Promotion.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err)=>next(err))
    .catch((err)=>nexr(err))
})

promotionsRouter.route('/:promotionId')
.get((req,res) => {
    Promotion.findById(req.params.promotionId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(promotion);

    }, (err) => next(err))
    .catch((err)=>next(err))
})
.post((req,res,next) => {
    res.end('POST operation not supported on /promotiones/'+
     req.params.promotionId)
})
.put((req,res,next) => {
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
.delete((req,res,next) => {
    Promotion.findByIdAndRemove(req.params.promotionId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err)=>next(err))
    .catch((err) => next(err))
})

module.exports = promotionsRouter