const mongoose = require("mongoose");
const {Schema} = mongoose;

const SubjectSchema = new Schema({
    name: {type: String, required: true},
    content_help: {type: String}
});

const Subject = module.exports = mongoose.model('Subject', SubjectSchema);