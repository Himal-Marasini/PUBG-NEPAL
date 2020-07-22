const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

// CONNECTED TO MONGODB
const DB_URI = process.env.development === "prod" ? process.env.DB_URI_CLOUD : process.env.DB_URI_LOCAL;

module.exports = mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to database');
        console.log(`Server is running at PORT ${process.env.PORT}`)
    })
    .catch((err) => console.error(`ERROR !!! Can't Connect to MongoDB ${err}`));