const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    numUsers: {
        type: Number,
        required: true
    },
    choices: {
        type: Array,
        default: [
            "tacos",
            "pizza",
            "sushi",
            "thai",
            'burgers',
            "soup dumplings",
            "subs",
            "bbq",
            "pho",
            "ramen",
            "tapas"
        ]
    },
    date: {
        type: Date, 
        default: Date.now
    }, 
    completedUsers: {
        type: Array,
        default: []
    }
});

module.exports = Session = mongoose.model('sessions', SessionSchema);