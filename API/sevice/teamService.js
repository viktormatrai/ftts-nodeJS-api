const Team = require('../models/team');

exports.assignToTeam = (req, res) => {
    const {teamId} = req.params;
    const {userId} = req.userData;
    removeFromOldTeamIfAssigned(userId);

    Team.updateOne({_id: teamId}, {$addToSet: {racers: userId}})
        .exec()
        .then(result => {
            res.status(201).json({
                message: "team updated",
                request: {
                    type: "GET",
                    url: `http://localhost:9999/teams/${teamId}`
                }
            })
        })
        .catch(error =>{
            res.status(500).json({
                error
            })
        });
};

const removeFromOldTeamIfAssigned = userId => {
    Team.find({racers: userId})
        .exec()
        .then(result => {
            if (result.length > 0) {
               Team.updateOne({_id: result[0]._id}, {$pull: {racers: userId}})
                   .exec()
           }
        })
};