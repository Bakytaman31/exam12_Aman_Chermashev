const express = require('express');

const auth = require('../middleware/auth');
const upload = require('../multer').uploads;

const Picture = require('../models/Picture');

const router = express.Router();

router.get('/', async (req, res) => {
    const pictures = await Picture.find({}, {"title": 1, "image": 1, "author": 1, "date": 1})
        .sort({"date": -1})
        .populate('author');
    res.send(pictures);
});

router.get('/:id', async (req, res) => {
    const pictures = await Picture.find({author: req.params.id}, {"title": 1, "image": 1, "author": 1, "date": 1})
        .sort({"date": -1})
        .populate('author');
    res.send(pictures);
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    try {
        const user = req.user;
        const whiteList = {
            title: req.body.title,
            image: req.file.filename,
            author: user._id
        };
        const picture = new Picture(whiteList);
        await picture.save();
        res.send(picture);
    } catch (e) {
        res.status(400).send({message: "Please, fill all inputs to create new picture"});
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Picture.deleteOne({_id: req.params.id});
        res.send('Deleted');
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;

