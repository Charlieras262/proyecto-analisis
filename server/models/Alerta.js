const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
  from: {type: String, required: true},
  to: {type: String, required: true},
  subject: {type: String, required: true},
  description: {type: String, required: true}
});

const Alert = module.exports = mongoose.model('Alert', AlertSchema);