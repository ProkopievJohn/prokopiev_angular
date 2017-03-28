// @flow

import mongoose, { Schema } from 'mongoose'

const User = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    }
});

export default mongoose.model('User', User);