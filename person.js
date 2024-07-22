const mongoose = require('mongoose');

//Create a person with this prototype:
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: null
  },
  favoriteFoods: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Person', personSchema);
