const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const { Track, validateTrack } = require('../../models/track');
const { User } = require('../../models/user');
const { Food } = require('../../models/food');

function convert(input) {
  let t = input;
  let f = 0;
  for(let i=0;i<t.length;i++) {
    if(t[i] === ' ') {
      f = i;
      break;
    }
  }
  let ctr = 0;
  let s = 0;
  for(let i=0;i<t.length;i++) {
    if(t[i] === ' ' && ctr===3) {
      s = i;
      break;
    }
    else if(t[i]===' ') ctr++;
  }
  t = t.substring(f+1, s);
  t = t.concat(' 05:30:00');
  return new Date(t);
}

router.post('/', auth, async (req, res) => {
    
  const { error } = validateTrack(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({email: req.user.email});
    let food = await Food.findOne({name: req.body.foodSelected});
    
    let today = Date().toString();

    // Handling Track Schema
    let found = false;
    let tracks = await Track.find();

    for(let idx in tracks) {
      let track = tracks[idx];
      // found track of today

      let t_date = convert(track.date.toString());
      let today_date = convert(today);

      if((req.user.email === track.email) && (t_date.toString() === today_date.toString())) {
        found = true;
        track.calories += ((+req.body.gramSelected/100)*(food.caloriesPerHundredGram));
        await track.save();
        break;
      }
    }

    if(!found) {
      let track = new Track({
        date: convert(today),
        email: req.user.email,
        calories: (+req.body.gramSelected/100)*(food.caloriesPerHundredGram)
      });
      await track.save();
      user.tracks.push(track);
      await user.save();
      
      let increase = 0;
      let days = 0;
      let calories = 0;
      let todayIntake = (+req.body.gramSelected/100)*(food.caloriesPerHundredGram);
      
      for(let idx in user.tracks) {
        let t = user.tracks[idx];
        let t_date = convert(t.date.toString());
        let today_date = convert(today);
        if(t_date.toString() !== today_date.toString()) {
          days++;
          calories += t.calories;
        }
      }
      if(days === 0) {
        increase = 0;
      }
      else {
        increase = Math.floor((todayIntake - (calories/days))*100/(calories/days));
      }
      let retObj = {
        increase: increase,
        todayIntake: todayIntake
      };
      res.send(retObj);
    }

    //Handling user tracks
    if(found) {
      for(let idx in user.tracks) {
        let t = user.tracks[idx];
        let t_date = convert(t.date.toString());
        let today_date = convert(today);
        if(t_date.toString() === today_date.toString()) {
          t.calories += (+req.body.gramSelected/100)*(food.caloriesPerHundredGram);
        }
      }
      await user.save();
      let increase = 0;
      let days = 0;
      let calories = 0;
      let todayIntake = 0;
      for(let idx in user.tracks) {
        let t = user.tracks[idx];
        let t_date = convert(t.date.toString());
        let today_date = convert(today);
        if(t_date.toString() === today_date.toString()) {
          todayIntake += t.calories;
        }
        else {
          days++;
          calories += t.calories;
        }
      }
      if(days === 0) {
        increase = 0;
      }
      else {
        increase = Math.floor((todayIntake - (calories/days))*100/(calories/days));
      }
      let retObj = {
        increase: increase,
        todayIntake: todayIntake
      };
      res.send(retObj);
    }
  }
  catch(err) {
      res.send(err);
  }
});

module.exports = router;