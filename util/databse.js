const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

// CONNECTED TO MONGODB
module.exports = mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to database');
        console.log(`Server is running at PORT ${process.env.PORT}`)
    })
    .catch((err) => console.error(`ERROR !!! Can't Connect to MongoDB ${err}`));