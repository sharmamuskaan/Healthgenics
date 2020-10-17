const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const { Task, validateTask } = require('../../models/task');
const { User } = require('../../models/user');

router.get('/', auth, async (req, res) => {
  
  try {
    let user = await User.findOne({email: req.user.email});
    if(!user) return res.status(400).send('Invalid Email or Password');
    res.send(user.tasks);
  }
  catch(err) {
    res.send(err);
  }
});

router.post('/', auth, async (req, res) => {
    
    const { error } = validateTask(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    if(req.body.deadline < today) {
      return res.status(400).send('Invalid deadline');
    }

    try {
      let user = await User.findOne({email: req.user.email});
      if(!user) return res.status(400).send('Invalid Email or Password');
    
      let task = new Task({
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline
      });
      
      user.tasks.push(task);
      await user.save();
      await task.save();
      user = await User.findOne({email: req.user.email});
      task = user.tasks[user.tasks.length - 1];
      res.send(task);
    }
    catch(err) {
      res.send(err);
    }
});

router.put('/:id', auth, async (req, res) => {

  try {
    let user = await User.findOne({email: req.user.email});
    if(!user) return res.status(400).send('Invalid Email or Password');
  
    let task = await Task.findOne({_id: req.params.id});
    if(!task) return res.status(400).send('Error Occured');

    task.status = 'Completed';
    await task.save();
    task = user.tasks.find(t => t._id.toString() === req.params.id);
    task.status = 'Completed';
    await user.save();
    res.send(user.tasks);
  }
  catch(err) {
    res.send(err);
  }
});

router.delete('/:id', auth, async (req, res) => {

  try {
    let user = await User.findOne({email: req.user.email});
    if(!user) return res.status(400).send('Invalid Email or Password');
  
    let task = await Task.findByIdAndDelete(req.params.id);
    if(!task) return res.status(400).send('Error Occured');

    let idx = user.tasks.findIndex(task => task._id.toString() === req.params.id);
    user.tasks.splice(idx, 1);
    await user.save();
    res.send(user.tasks);
    
  }
  catch(err) {
    res.send(err);
  }
});

module.exports = router;