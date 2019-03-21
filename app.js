const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoAtlasURIStr = 'mongodb://viktormatrai:' + process.env.MONGO_ATLAS_PW +
                        '@ftts-shard-00-00-ut7wu.mongodb.net:27017,ftts-shard-00-01-ut7wu.mongodb.net:27017,' +
                        'ftts-shard-00-02-ut7wu.mongodb.net:27017/test?ssl=true&replicaSet=' +
                        'FTTS-shard-0&authSource=admin&retryWrites=true';

const raceRoutes = require('./API/routes/race');
const racerRoutes = require('./API/routes/racer');
const teamRoutes = require('./API/routes/team');
const racerTimeRoutes = require('./API/routes/racerTime');


mongoose.connect(mongoAtlasURIStr, {useNewUrlParser: true, dbName: 'FTTS_TEST'});
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', raceRoutes);
app.use('/racers', racerRoutes);
app.use('/teams', teamRoutes);
app.use('/times', racerTimeRoutes);

app.use((req, res, next) => {
   const error = new Error("Not found");
   error.status = 404;
   next(error);
});

app.use((err, req, res, next) => {
   res.status(err.status || 500);
   console.log(err);
   res.json({
       error: {
           message: err.message
       }
   });
});

module.exports = app;