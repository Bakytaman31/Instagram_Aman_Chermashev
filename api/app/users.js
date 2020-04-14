const express = require('express');
const bcrypt = require("bcrypt");
const axios = require("axios");
const {nanoid} = require("nanoid");

const config = require('../config');
const User = require('../models/User');
const auth = require('../middleware/auth');

const upload = require('../multer').avatar;

const router = express.Router();

router.post('/', upload.single('avatar'), async (req, res) => {
    try {
        const data = req.body;

        if (req.file) {
            data.avatar = req.file.filename
        }

        const user = new User({
            username: data.username,
            password: data.password,
            displayName: data.displayName
        });

        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: 'Username or password not correct!'});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Username or password not correct!'});
    }

    user.generateToken();

    await user.save();

    return res.send(user);
});

router.patch('/profile', [auth, upload.single('avatar')], async (req, res) => {
    try {
        if (req.file) {
            req.user.avatar = req.file.filename;
        }

        if (req.body.displayName) {
            req.user.displayName = req.body.displayName;
        }

        await req.user.save();

        return res.send(req.user);
    } catch (e) {
        return res.sendStatus(500);
    }
});

router.delete('/sessions', async (req, res) => {
    const success = {message: 'Success'};

    try {
        const token = req.get('Authorization').split(' ')[1];

        if (!token) return res.send(success);

        const user = await User.findOne({token});

        if (!user) return res.send(success);

        user.generateToken();
        await user.save();

        return res.send(success);
    } catch (e) {
        return res.send(success);
    }
});

router.post('/facebook', async (req, res) => {
    try {
        const inputToken = req.body.accessToken;
        const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

        const url = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

        const response = await axios.get(url);

        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect'});
        }

        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: 'User ID incorrect'});
        }

        let user = await User.findOne({facebookId: req.body.id});

        if (!user) {


            user = new User({
                username: req.body.id,
                password: nanoid(),
                facebookId: req.body.id,
                displayName: req.body.name,
                avatar: req.body.picture.data.url
            });
        }

        user.generateToken();
        await user.save();

        return res.send(user);
    } catch (e) {
        return res.sendStatus(401);
    }
});

router.post('/subscribe', auth, async (req, res) => {
    try {
        const user = req.user;
        const person = await User.findOne({displayName: req.body.name});
        const follower = await User.findOne({_id: user._id});
        follower.subscribes.push(person._id);
        await follower.save();
        res.send('Saved');
    } catch (e) {
        res.status(404).send({message: "Not found"});
    }

});

module.exports = router;