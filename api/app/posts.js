const express = require('express');

const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/auth');

const upload = require('../multer').uploads;

const router = express.Router();

router.post('/', [auth, upload.single('image')], async (req, res) => {
    try {
        const user = req.user;
        if (!req.body.text && !req.file) {
            return res.status(400).send({message: 'Please fill image or text'})
        }
        const postData = {
            text: req.body.text,
            tags: JSON.parse(req.body.tags),
            user: user._id
        };

        if (req.file) {
            postData.image = req.file.filename;
        }

        const newPost = new Post(postData);
        await newPost.save();
        return res.send(newPost);
    } catch (e) {
        return res.status(400).send({message: 'You have to add at least one tag'});
    }
});

router.get('/', auth, async (req,res) => {
    try {
        const user = req.user;
        const person = await User.findOne({_id: user._id});
        person.subscribes.push(user._id);
        const posts = await Post.find({user: {$in: person.subscribes}}, {"text": 1, "image": 1, "user": 1, "tags":1, "date": 1})
            .sort({"date": -1})
            .populate('user');
        return res.send(posts)
    } catch (e) {
        console.log(e);
        return res.status(404).send({message: 'Not found'});
    }
});

router.get('/tags', async (req, res) =>{
    try {
        const tags = await Post.find().distinct('tags');

        return res.send(tags);
    } catch (e) {
        console.log(e);
        console.log('hi');
    }
});

module.exports = router;