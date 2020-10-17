const Joi = require('joi');
const mongoose = require('mongoose');
const { foodSchema } = require('./food');

const trackSchema = new mongoose.Schema({
  email: String,
  date: {
    type: Date,
    default: Date.now
  },
  foods: {
    type: Array,
    default: []
  },
  calories: Number
});

const Track = mongoose.model('Track', trackSchema);

function validateTrack(task) {
  const schema = Joi.object({
    foodSelected: Joi.string().min(3).max(50).required(),
    gramSelected: Joi.number().integer().min(100).required()
  });
  return schema.validate(task);
}

module.exports.Track = Track;
module.exports.trackSchema = trackSchema;
module.exports.validateTrack = validateTrack;