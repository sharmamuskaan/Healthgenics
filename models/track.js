const Joi = require('joi');
const mongoose = require('mongoose');
const { foodSchema } = require('./food');

const trackSchema = new mongoose.Schema({
  name: {
    type: foodSchema,
    required: true
  },
  servings: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

const Track = mongoose.model('Track', trackSchema);

function validateTrack(task) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        servings: Joi.number().min(1).required,
        date: Joi.date().min(Date.now)
    });
    return schema.validate(task);
}

module.exports.Track = Track;
module.exports.trackSchema = trackSchema;
module.exports.validateTrack = validateTrack;