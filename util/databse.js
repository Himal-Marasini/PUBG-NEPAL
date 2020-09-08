const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

// CONNECTED TO MONGODB
const DB_URI =
  process.env.NODE_ENV === "prod" ? process.env.DB_URI_CLOUD : process.env.DB_URI_LOCAL;

module.exports = mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.error(`ERROR !!! Can't Connect to MongoDB ${err}`));
