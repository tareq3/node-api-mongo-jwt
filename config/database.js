//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = "mongodb://tareq:rakib72542@127.0.0.1:27017/node_rest_api?authSource=admin";
mongoose.connect(mongoDB,  {  useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...'));

mongoose.Promise = global.Promise;
module.exports = mongoose;
