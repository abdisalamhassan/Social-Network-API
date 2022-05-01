const { Schema,model,Types  }= require('mongoose');
const moment =require('moment');

const reactionSchema = new Schema({
    reactionId:
     {type: Types.ObjectId,
    default: new Types.ObjectId()
    },
    reactionBody:{
        type: String,
        required: true,
        maxLength: 200
    },
    username: {
        type: String,
        required: true
    },

    createdAt: {
        type: DataTransfer,
        default: DataTransfer.now,
    },

    {
        toJson: {
            getters: true
        },
    },
    id:false
});

module.exports = reactionSchema;