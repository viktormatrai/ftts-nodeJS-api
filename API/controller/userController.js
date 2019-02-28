const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = require('../models/user');
exports.signUp = (req, res, next) => {
    user.find({ email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "this email is already in use"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err){
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new user({
                            _id: new mongoose.Types.ObjectId,
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "user created"
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
            }
        });
};

exports.logIn = (res, req, next) => {
  user.findOne({ email: req.body.email})
      .exec()
      .then(user => {
          if (user.length < 1) {
              return res.status(401).json({
                  message: 'Authentication failed'
              });
          }
          bcrypt.compare(req.body.password, user.password, (err, result) => {
              if (err) {
                  return res.status(401).json({
                      message: 'Authentication failed'
                  });
              }
              if (result) {
                  const token = jwt.sign({
                      email: user.email,
                      userId: user._id
                    },
                    process.env.JWT_KEY,
                      {
                          expiresIn: '1h'
                      });
                  return res.status(200).json({
                      message: 'Authenticated',
                      token: token
                  });
              }
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          });
      });
};

exports.deleteUser = (req, res, next) => {
  user.removeOne({_id: req.params.userId})
      .exec()
      .then(result=> {
          res.status(200).json({
              message: "user deleted"
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          });
      });
};

exports.getAllRacers = (res, req, next) => {
    racer.find()
        .select('firstName lastName nickName team points')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                racers: docs.map(docs => {
                    return {
                        firstName: docs.firstName,
                        lastName: docs.firstName,
                        nickName: docs.nickName,
                        team: docs.team,
                        points: docs.points
                    }
                })

            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


exports.getUserbyId = (res, req, next) => {
    const id = req.params._id;

    racer.findOne(id)
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json({
                   racer: doc
                });
            } else {
                res.status(404).json({
                    message: "nothing's here"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.stat(500).json({
                error: err
            });
        });
};

exports.logOut = (req, res, next) => {

};