import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'song',
    }],
    lyrics: [{
        type: Schema.Types.ObjectId,
        ref: 'lyric',
    }],
});

const User = mongoose.model('user', userSchema);

export default User;