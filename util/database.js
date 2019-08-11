const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

// CONNECTED TO MONGODB
module.exports = mongoose.connect('mongodb://localhost/pubgNepal', {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => console.error(`ERROR !!! Can't Connect to MongoDB ${err}`));