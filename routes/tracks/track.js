const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const { Track, validateTrack } = require('../../models/track');
const { User } = require('../../models/user');

router.get('/', auth, async (req, res) => {
  
  try {
    let user = await User.findOne({email: req.user.email});
    if(!user) return res.status(400).send('Invalid Email or Password');
    res.send(user.foodTrack);
  }
  catch(err) {
    res.send(err);
  }
});

router.post('/', auth, async (req, res) => {
    
    const { error } = validateTrack(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        let user = await User.findOne({email: req.user.email});
        if(!user) return res.status(400).send('Invalid Email or Password');
        
        let track = new Track({
          name: req.body.name,
          servings: req.body.servings,
        });

        // new Fawn.Task()
        //         .save('tracks', track)
        //         .update('users', {_id: user._id}, {$push: { foodTrack: track }})
        //         .run();
        user.foodTrack.push(track);
        await user.save();
        await track.save();
        res.send(track);
    }
    catch(err) {
        res.send(err);
    }
});

module.exports = router;