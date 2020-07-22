const express = require('express');
const favoritesRouter = express.Router();
const Favorites = require('../models/favorites');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../authenticate');
const favorites = require('../models/favorites');

favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
.options(cors.corsWithOptions, (req,ers) => { res.sendStatus(200); })
.get(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    Favorites.find({'user':req.user._id})
    .populate('user')
    .populate('favorites')
    .then((favorites) => {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);

    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {

})
.put(cors.corsWithOptions,authenticate.verifyUser, (req,res,next) => {

})
.delete(cors.corsWithOptions,authenticate.verifyUser, (req,res,next) => {
    Favorites.remove({})
    .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err))
})

favoritesRouter.route('/:dishId')
.options(cors.corsWithOptions, (req,ers) => { res.sendStatus(200); })
.get(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {

})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    const dishId = req.params.dishId;
    Favorites.create({
        user: req.user._id,
        favorites: dishId
    })
    .then((favorites) => {
        console.log('Favorite created for user'+req.user._id+
        '\n as '+favorites)
        res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json')
        res.send(favorites)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put(cors.corsWithOptions,authenticate.verifyUser, (req,res,next) => {

})
.delete(cors.corsWithOptions,authenticate.verifyUser, (req,res,next) => {
    Favorites.find({})
        .populate('user')
        .populate('favorites')
        .then((favourites) => {
            var user;
            if(favourites)
                user = favourites.favorites.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];
            if(user){
                user.dishes = user.dishes.filter((dishid) => dishid._id.toString() !== req.params.dishId);
                user.save()
                    .then((result) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(result);
                    }, (err) => next(err));
                
            } else {
                var err = new Error('You do not have any favourites');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
})

module.exports = favoritesRouter;