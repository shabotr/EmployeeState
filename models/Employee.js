let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const employeeSchema = new Schema({
    first_name: {
        type: String,
        default: ''
    },

    last_name: {
        type: String,
        default: ''
    },

    email: {
        type: String,
        default: '',
        required: true
    },

    status: {
        type: String,
        lowercase: true,
        enum: ['working', 'on vacation', 'lunch time', 'business trip'],
        default: 'working'
    }
}, {collection: 'employee', versionKey: false});

module.exports = mongoose.model('Employee', employeeSchema);