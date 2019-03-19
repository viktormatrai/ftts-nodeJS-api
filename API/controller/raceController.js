const mongoose = require('mongoose');
const Race = require('../models/race');

exports.getAllRaces = (req, res, next) => {
    Race.find()
        .select('raceName dateOfRace distance elevation _id')
        .exec()
        .then(docs => {
            const response = {
                races: docs.map(doc => {
                    return {
                        raceName: doc.raceName,
                        dateOfRace: doc.dateOfRace,
                        distance: doc.distance,
                        elevation: doc.elevation,
                        individual: doc.individual,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:9998/'+ doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.createRace = (req, res, next) => {
    const race = new Race({
        _id: new mongoose.Types.ObjectId(),
        raceName: req.body.raceName,
        dateOfRace: req.body.dateOfRace,
        distance: req.body.distance,
    });
    race.save()
        .then(result => {
           console.log(result);
           res.status(201).json({
               createdRace: {
                   raceName: result.raceName,
                   dateOfRace: result.dateOfRace,
                   distance: result.distance
               }
           })
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.getRaceById = (req, res, next) => {
  const id = req.params.raceId;

  Race.findById(id, 'raceName dateOfRace distance elevation individual racers')
      .exec()
      .then(doc => {
          if (doc){
              res.status(200).json({
                    raceName: doc.raceName,
                    dateOfRace: doc.dateOfRace,
                    distance: doc.distance,
                    elevation: doc.elevation,
                    individual: doc.individual,
                    racers: doc.racers
                  });
          } else {
              res.status(404)
                  .json({message: 'Nothing here'})
          }
      })
      .catch(err =>{
          console.log(err);
          res.status(500).json({
              error: err
          });
      });
};

exports.updateRace = (req, res, next) => {
  const id = req.params.raceId;
  const updateOps = {};
  for (const ops of req.body) {
      updateOps[ops.propertyName] = ops.value;
  }
  Race.update({_id: id}, {$set: updateOps})
      .exec()
      .then(result => {
          res.status(200).json({
              message: "race updated",
              request: {
                  type: "GET",
                  url: "http://localhost:9999/race " + doc._id
              }
          })
      })
      .catch(err =>{
          console.log(err);
          res.status(500).json({
              error: err
          });
      });
};

exports.deleteRace = (req, res, next) => {
    const id = req.params.raceId;

    Race.removeOne({ _id: id})
        .exec()
        .then( result => {
            res.status(200).json({
                message: "race deleted"
            })
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

