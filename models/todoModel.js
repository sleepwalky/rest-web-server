const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoModel = new Schema({
    name: {
        type: String
    },
    descr: {
        type: String,
    },
    hours: {
        type: Number
    },
    type: {
        type: Number
    }
});

module.exports = mongoose.model('Todo', todoModel);