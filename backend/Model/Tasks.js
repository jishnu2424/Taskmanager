const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  task: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});

const TaskDB = mongoose.model('Tasks', schema);
module.exports = TaskDB;
