const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require('config');
const { taskSchema } = require('./task');
const { trackSchema } = require('./track');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    date: {
        type: Date,
        default: Date.now
    },
    age : {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    goals: String,
    tasks: [taskSchema],
    foodTrack: [trackSchema]
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id,  name: this.name, email: this.email}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateRegisterInput(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required(),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')),
        age: Joi.number().integer().min(10).required(),
        height: Joi.number().integer().min(10).required(),
        weight: Joi.number().integer().min(10).required(),
        gender: Joi.string().required(),
        goals: Joi.string().required()
    });
    return schema.validate(user);
}

module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validateRegisterInput = validateRegisterInput;