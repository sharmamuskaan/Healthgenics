const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

const Joi = require('joi');
const auth = require('../../middleware/auth');
const {User} = require('../../models/user');

function validateInput(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    age: Joi.number().integer().min(10).required(),
    height: Joi.number().integer().min(10).required(),
    weight: Joi.number().integer().min(10).required(),  
    goal: Joi.string().required()
  });
  return schema.validate(user);
}

function validatePassInput(user) {
  const schema = Joi.object({
    currPass: Joi.string().min(5).max(255).required(),
    newPass: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

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

router.get('/me', auth, async(req, res) => {
  
  try {
    
    let user = await User.findOne({email: req.user.email});

    let today = Date().toString();

    let prevTracks = [];
    let ctr = 0;
    for(let idx in user.tracks) {
      let track = user.tracks[idx];
      if(ctr === 2 ) {
        break;
      }

      let t_date = convert(track.date.toString());
      let today_date = convert(today);

      if(t_date < today_date) {
        prevTracks.push(track);
        ctr++;
      }
    }

    let todayIntake = 0;
    let days = 0;
    let calories = 0;
    
    for(let idx in user.tracks) {
      let track = user.tracks[idx];
      let t_date = track.date.toString();
      t_date = convert(t_date);
      let today_date = convert(today);
      if(today_date.toString() === t_date.toString()) {
        todayIntake = track.calories;
      }
      else {
        days++;
        calories+= track.calories;
      }
    }

    if(days === 0) {
      increase = 0;
    }
    else {
      increase = Math.floor((todayIntake - (calories/days))*100/(calories/days));
    }

    retObj = {
      name: user.name,
      email: user.email,
      gender: user.gender,
      goal: user.goal,
      prevTracks: prevTracks,
      todayIntake: todayIntake,
      increase: increase
    }
    res.send(retObj);
  }
  catch(ex) {
    res.send(ex);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    let user = await User.findOne({email: req.user.email}).select('name age height weight goal');
    res.send(user);
  }
  catch(ex) {
    res.send(ex);
  }
});

router.post('/', auth, async (req, res) => {
  const {error} = validateInput(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  try{
    let user = await User.findOne({email: req.user.email}).select('name age height weight goal');
    user.name = req.body.name;
    user.age = req.body.age;
    user.weight = req.body.weight;
    user.goal = req.body.goal;
    user.height = req.body.height;
    await user.save();
    res.send(user);
  }
  catch(ex){
    res.send(ex);
  }
});

router.put('/', auth, async (req, res) => {
  
  const {error} = validatePassInput(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  try{
    let user = await User.findOne({email: req.user.email});
    
    const validPassword = await bcrypt.compare(req.body.currPass, user.password);   
    
    if(!validPassword) return res.status(400).send('Invalid Password');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.newPass, salt);
    await user.save();
    res.send('OK');
  }
  catch(ex){
    res.send(ex);
  }
});

module.exports = router;