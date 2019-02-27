const mongoose = require('mongoose');
const race = require('../models/race');

exports.getAllRaces = (res, req, next) => {
    race.find()
        .select('raceName dateOfRace distance _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                races: docs.map(docs => {
                    return {
                        raceName: doc.raceName,
                        dateOfRace: doc.dateOfRace,
                        distance: doc.distance,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:9999/race/doc._id'
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
    const race = new race({
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

exports.getRaceById = (res, req, next) => {
  const id = req.params.raceId;

  race.findOne(id, 'raceName dateOfRace distance racers')
      .exec()
      .then(doc => {
          if (doc){
              res.status(200).json({
                    race: doc
                  }
              )
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
  race.update({_id: id}, {$set: updateOps})
      .exec()
      .then(result => {
          res.status(200).json({
              message: "race updated",
              request: {
                  type: "GET",
                  url: "http://localhost:9999/race " + id
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

    race.removeOne({ _id: id})
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

