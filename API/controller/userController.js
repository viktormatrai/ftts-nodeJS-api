const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signUp = (req, res, next) => {
    const userToRegister = req.body.formValues
    User.find({ email: userToRegister.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "this email is already in use"
                });
            } else {
                bcrypt.hash(userToRegister.password, 10, (err, hash) => {
                    if (err){
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            email: userToRegister.email,
                            password: hash,
                            firstName: userToRegister.firstName,
                            lastName: userToRegister.lastName,
                            admin: userToRegister.admin,
                            gender: userToRegister.gender
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

exports.logIn = (req, res, next) => {
  User.findOne({ email: req.body.email})
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
                      userId: user._id,
                      admin: user.admin
                    },
                    process.env.JWT_KEY,
                      {
                          expiresIn: '15h'
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
  User.remove({_id: req.params.userId})
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

exports.getAllRacers = (req, res, next) => {
    User.find()
        .select('firstName lastName nickName team points _id')
        .exec()
        .then(docs => {
            const response = {
                racers: docs.map(doc => {
                    return {
                        firstName: doc.firstName,
                        lastName: doc.firstName,
                        nickName: doc.nickName,
                        team: doc.team,
                        points: doc.points,
                        id: doc._id,
                        response: {
                            type: 'GET',
                            url: 'http://localhost:9998/racers/'+ doc._id
                        }
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


exports.getUserById = (req, res, next) => {
    const id = req.params._id;

    User.findOne(id, 'firstName lastName nickName team points races')
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json({
                    firstName: doc.firstName,
                    lastName: doc.lastName,
                    nickName: doc.nickName,
                    team: doc.team,
                    points: doc.points,
                    races: doc.races
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

exports.returnUserByToken = (req, res, next) => {
    try {
        const user = {
            email: req.userData.email,
            isAdmin: req.userData.admin
        };
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};