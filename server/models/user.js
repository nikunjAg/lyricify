import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.statics.removeSong = async function(userId, songId) {
    const updatedUser = await this.findByIdAndUpdate(userId, {
        $pull: {
            songs: new mongoose.Types.ObjectId(songId),
        }
    }, {
        new: true,
    });

    return updatedUser;
};

userSchema.statics.removeLyric = async function(userId, lyricId) {
    const updatedUser = await this.findByIdAndUpdate(userId, {
        $pull: {
            lyrics: new mongoose.Types.ObjectId(lyricId),
        }
    }, {
        new: true,
    });

    return updatedUser;
};

// Hashing the password before 'save'
userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hashedPassword) => {
            if (err) return next(err);

            user.password = hashedPassword;
            next();
        });
    });
});


// Comparing plain and hashed passwords
userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, (err, result) => {
        cb(err, result);
    });
};

const User = mongoose.model('user', userSchema);

export default User;