const { Schema, model } =require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

const ThoughtSchema = new Schema({
    thoughtText:{
        type: String,
        required: true,
        minLength: 1,
        macLength:200
    },
    createdAt: {
        type: Data, 
        required: true,
        maxLength:200
    },
    username: {
        type: String,
        required:true,
    },
    
})
