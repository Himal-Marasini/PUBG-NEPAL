const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

// CONNECTED TO MONGODB
module.exports = mongoose.connect('mongodb+srv://Himal-Marasini:d9N5RVJwphhMJVaq@pubg-nepal-kscg2.mongodb.net/PUBG-NEPAL?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => console.error(`ERROR !!! Can't Connect to MongoDB ${err}`));