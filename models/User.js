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
    }
});

module.exports = User = mongoose.model('users', UserSchema);