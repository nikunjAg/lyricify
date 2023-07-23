import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LyricSchema = new Schema({
  song: {
    type: Schema.Types.ObjectId,
    ref: 'song'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

LyricSchema.statics.like = function(id) {
  const Lyric = mongoose.model('lyric');

  return Lyric.findById(id)
    .then(lyric => {
      ++lyric.likes;
      return lyric.save();
    });
}

LyricSchema.pre('findOneAndDelete', async function(next) {
  const doc = await this.model.findOne(this.getFilter());
  
  const { song: songId, _id: lyricId } = doc;

  const Song = mongoose.model('song');

  const songDoc = await Song.findById(songId.toString());

  songDoc.lyrics = songDoc.lyrics.filter(lyric => lyric.toString() !== lyricId.toString());

  await songDoc.save();

  next();
});

const Lyric = mongoose.model('lyric', LyricSchema);

export default Lyric;