const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    courses: {
        type: [String],
        required: true,
        default: []
    }
    
});

module.exports = teacherSchema;
