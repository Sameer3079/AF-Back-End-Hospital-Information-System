var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/his_system', err => {
    if(err) {
        console.log(err);
        process.exit(-1);
    }
    console.log("Successfully connected to the database");
});

module.exports = mongoose;