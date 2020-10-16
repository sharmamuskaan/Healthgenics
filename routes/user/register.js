const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

const {User, validateRegisterInput} = require('../../models/user');

router.post('/', async (req, res) => {
    
    const { error } = validateRegisterInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        let user = await User.findOne({email: req.body.email});
        if(user) return res.status(400).send('Email already exists');
        user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password, 
          age: req.body.age,
          weight: req.body.weight,
          height: req.body.height,
          goals: req.body.goals,
          gender: req.body.gender,
        });
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        
        await user.save();
        res.send({
          name:user.name,
          email:user.email
        });
    }
    catch(err) {
      res.send(err);
    }
});

module.exports = router;