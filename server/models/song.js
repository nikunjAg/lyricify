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

SongSchema.statics.addLyric = function(id, content) {
  const Lyric = mongoose.model('lyric');

  return this.findById(id)
    .then(song => {
      const lyric = new Lyric({ content, song })
      song.lyrics.push(lyric)
      return Promise.all([lyric.save(), song.save()])
        .then(([lyric, song]) => [lyric, song]);
    });
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

const Song = mongoose.model('song', SongSchema);

export default Song;