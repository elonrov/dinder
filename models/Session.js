const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    date: {
        type: Date, 
        default: Date.now
    }, 
    
});

module.exports = Session = mongoose.model('sessions', SessionSchema);