import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LyricSchema = new Schema({
  song: {
    type: Schema.Types.ObjectId,
    ref: 'song',
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

LyricSchema.statics.like = async function(id) {
  const Lyric = mongoose.model('lyric');

  return Lyric.findByIdAndUpdate(id, {
    $inc: {
      likes: 1,
    }
  },
  { new: true });
}

LyricSchema.pre('findOneAndDelete', async function(next) {
  const doc = await this.model.findOne(this.getFilter());
  
  const { song: songId, _id: lyricId } = doc;

  await mongoose.model('song').removeLyric(songId, lyricId);
  
  next();
});

const Lyric = mongoose.model('lyric', LyricSchema);

export default Lyric;