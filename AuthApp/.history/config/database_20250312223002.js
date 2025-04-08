const mongoose = require('mongoose');

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB');
        console.error(err);
        process.exit(1);
    });
}




// const mongoose = require("mongoose");
// require("dotenv").config();

// exports.connect = () => {
//     console.log("Connecting to MongoDB...");
//     console.log("MongoDB URL:", process.env.MONGODB_URL); // Debugging

//     mongoose.connect(process.env.MONGODB_URL)
//         .then(() => console.log("Connected to MongoDB"))
//         .catch((err) => {
//             console.error("Error connecting to MongoDB", err);
//             process.exit(1);
//         });
// };
