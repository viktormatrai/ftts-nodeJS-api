const mongoose = require('mongoose');

const Team = require('../models/team');

exports.getAllTeams = (req, res, next) => {
  Team.find()
      .select('_id teamName racers races teamPoints')
      .then(teams => {
          const response = {
              teams: teams.map(team => {
                  return {
                      _id: team._id,
                      teamName: team.teamName,
                      racers: team.racers,
                      races: team.races,
                      teamPoints: team.teamPoints
                  }
              })
          };
          res.status(200).json(response);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          })
      });
};

exports.createTeam = (req, res, next) => {
    Team.find({ teamName: req.body.teamName})
        .exec()
        .then(team => {
            if (team.length >= 1) {
                return res.status(409).json({
                    message: "this team is already created"
                });
            } else {
                const team = new Team({
                        _id: new mongoose.Types.ObjectId,
                        teamName: req.body.teamName,
                });
                team.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "team created"
                        });
                    })
                    .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                        });
                    });
            }
        });
};

exports.assignToTeam = (req, res, next) => {
    const id = req.params._id;
    const updateOps = {};
    for (const ops of Object.keys(updateOps)) {
        updateOps[ops.propertyName] = ops.value;
    }
    Team.updateOne({_id: id}, {$addToSet: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "team updated",
                request: {
                    type: "GET",
                    url: "http://localhost:9999/teams " + result._id
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
