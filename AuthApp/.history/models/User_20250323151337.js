const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        // lowercase: true,
        // validate: {
        //     validator: function(email) {
        //         return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
        //     },
        //     message: '{VALUE} is not a valid email address.'
        // },
        // unique: true,
        // match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['Admin', 'Student', 'Candidate'],
    }
})

module.exports = mongoose.model('user', userSchema);