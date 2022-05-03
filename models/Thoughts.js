const { Schema, model } =require('mongoose');
const moment = require('moment');

const ThoughtSchema = new Schema({
    thoughtText:{
        type: String,
        required: true,
        minLength: 1,
        maxLength:200
    },
    createdAt: {
        type: Date, 
        required: true,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
        default: Date.now,
    },
    username: {
        type: String,
        required:true,
    },
},
    {
        toJson:{
            virtuals:true
        },
        id: false
    });

    const Thoughts = model('Thoughts', ThoughtSchema);

module.exports = Thoughts;