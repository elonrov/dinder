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
    restaurants: {
        type: Array,
        default: []
    },
    date: {
        type: Date, 
        default: Date.now
    }, 
    completedUsers: {
        type: Array,
        default: []
    },
    winningCuisine: {
        type: String, 
        default: null
    },
    winningRestaurant: {
        type: String, 
        default: null
    }
});

module.exports = Session = mongoose.model('sessions', SessionSchema);