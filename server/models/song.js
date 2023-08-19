import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: { type: String },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  lyrics: [{
    type: Schema.Types.ObjectId,
    ref: 'lyric',
  }]
});

SongSchema.statics.addLyric = async function(id, createdBy, content) {
  const Lyric = mongoose.model('lyric');
  
  const song = await this.findById(id);
  
  const lyric = new Lyric({ content, song, createdBy });
  await lyric.save();

  song.lyrics.push(lyric);
  await Promise.all([
    mongoose.model('user').addLyric(createdBy, lyric.id),
    song.save(),
  ]);
  
  return [lyric, song];
}

SongSchema.statics.removeLyric = async function(id, lyricId) {
  const res = await this.findByIdAndUpdate(id, {
    $pull: {
      lyrics: new mongoose.Types.ObjectId(lyricId)
    }
  }, {
    new: true,
  });

  return res;
}

SongSchema.statics.findLyrics = function(id) {
  return this.findById(id)
    .populate('lyrics')
    .then(song => song.lyrics);
}

SongSchema.pre('findOneAndDelete', async function(next) {
  const doc = await this.model.findOne(this.getFilter());

  const { createdBy, _id: songId } = doc;

  await mongoose.model('user').removeSong(createdBy, songId);

  next();
});

const Song = mongoose.model('song', SongSchema);

export default Song;