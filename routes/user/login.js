const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require('joi');

const {User} = require('../../models/user');

function validateLoginInput(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(user);
}

router.post('/', async (req, res) => {
    
    const { error } = validateLoginInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        let user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Invalid Email or Password');
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);   
        if(!validPassword) return res.status(400).send('Invalid Email or Password');
        
        const token = user.generateAuthToken();
        res.json({
            success: true,
            token: "Bearer " + token
        });
    }
    catch(err) {
        res.send(err);
    }
});

module.exports = router;