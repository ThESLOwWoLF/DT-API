// in the models file
const mongoose=require('mongoose')
const { test } = require('../routes/test')
const testSchema= new mongoose.Schema({
    type: {
        type: String,
        required: true,
        default: 'event',
    },
    uid: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    tagline: {
        type: String,
        required: true,
    },
    schedule: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    files: {
        type: [String], 
        required: true,
    },
    moderator: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    sub_category: {
        type: String,
        required: true,
    },
    rigor_rank: {
        type: Number,
        required: true,
    },
    attendees: {
        type: [String],
        default: [],
    },
});

module.exports=mongoose.model('test',testSchema)