const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    regNo: {
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
    registeredCourses: {
        type: [String],
        required: true,
        default: []
    }
    
});

module.exports = studentSchema;
