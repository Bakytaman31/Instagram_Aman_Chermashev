const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    text: String,
    image: String,
    tags: [String],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;