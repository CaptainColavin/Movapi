const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const movie = require('../models/movie');
const app = express();
module.exports = router;

  // movies
  //getAllMovies
  router.route('/movies').get( function(req, res){
      movie.find({}, (err, docs) => {
        if (err) { return console.error(err); }
        res.status(200).json(docs);
      });
    });

  //router.route('/movies/count').get(catCtrl.count);

  //insert Movie
  router.route('/movie').post(function(req, res){
    //const obj = new movie(req.body);

    var obj = new movie({
       name: req.body.name,
       synopsis: req.body.synopsis,
       actors: req.body.actors,
       duration: req.body.duration,
     });

    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  });

  //get by ID
  router.route('/movie/:id').get(function(req, res){
    movie.findOne({ _id: req.params.id }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  });

  // Update by id
  router.route('/movie/:id').put( function(req, res){
      movie.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
        if (err) { return console.error(err); }
        res.sendStatus(200);
      });
    });

  //delete by ID
  router.route('/movie/:id').delete(function(req, res){
    movie.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  });




  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
