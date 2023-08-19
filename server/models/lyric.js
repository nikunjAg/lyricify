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
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'user'}],
  content: { type: String }
});

LyricSchema.statics.likeDislike = async function(userId, id) {
  const Lyric = mongoose.model('lyric');
  
  const lyric = await Lyric.findById(id);

  const updatedLyrics = lyric.likedBy.filter(id => id.toString() !== userId);
  if (updatedLyrics.length === lyric.likedBy.length) {
    updatedLyrics.push(userId);
  }

  lyric.likedBy = updatedLyrics;

  return await lyric.save();
}

LyricSchema.pre('findOneAndDelete', async function(next) {
  const doc = await this.model.findOne(this.getFilter());
  
  const { song: songId, _id: lyricId, createdBy } = doc;

  await mongoose.model('song').removeLyric(songId, lyricId);
  await mongoose.model('user').removeLyric(createdBy, lyricId);
  
  next();
});

const Lyric = mongoose.model('lyric', LyricSchema);

export default Lyric;