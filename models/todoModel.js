const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoModel = new Schema({
    title: {
        type: String
    },
    status: {
        type: Number
    }
});

module.exports = mongoose.model('Todo', todoModel);