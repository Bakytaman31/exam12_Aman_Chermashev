const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        req: true,
        ref: 'User'
    }
});

const Picture = mongoose.model('Picture', PictureSchema);

module.exports = Picture;