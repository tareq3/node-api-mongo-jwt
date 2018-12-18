const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
//Define a schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
});

// hash user password before saving into database
UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});
//exporting model of mongodb
module.exports = mongoose.model('User', UserSchema);