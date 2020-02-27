const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String, 
        required: true
    }, 
    sessionId: {
        type: Schema.Types.ObjectId, 
        ref: 'sessions'
    },
    sessionCode: {
        type: Number,
        required: true,
        default: ''
    }, 
    rejections: {
        type: Array,
        default: []
    },
    host: {
        type: Boolean,
        default: false
    }

});

module.exports = User = mongoose.model('users', UserSchema);