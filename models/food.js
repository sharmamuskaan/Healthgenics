const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    caloriePerServing: {
      type: Number
    }
});

const Food = mongoose.model('Food', foodSchema);

module.exports.Food = Food;
module.exports.foodSchema = foodSchema;