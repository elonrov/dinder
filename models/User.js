const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String, 
        required: true
    }, 
    session: {
        type: Schema.Types.ObjectId, 
        ref: 'sessions'
    },
    session_code: {
        type: Number,
        required: true,
        default: 123456
    }

});

module.exports = User = mongoose.model('users', UserSchema);