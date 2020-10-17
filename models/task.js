const Joi = require('joi');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
    trim: true
  },
  status: {
    type: String,
    default: 'Pending'
  },
  deadline: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model('Task', taskSchema);

function validateTask(task) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(5).max(100).required(),
    deadline: Joi.string().required()
  });
  return schema.validate(task);
}

module.exports.Task = Task;
module.exports.taskSchema = taskSchema;
module.exports.validateTask = validateTask;