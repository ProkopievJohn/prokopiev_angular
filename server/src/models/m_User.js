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
    email: {
        type: String,
        required: true,
        unique: true
    }
});

export default mongoose.model('User', User);