const mongoose = require("mongoose");
const {Schema} = mongoose;

const UnitySchema = new Schema({
    number: {type: Number, required: true},
    subjects: [{type: Schema.ObjectId, ref:'Subject'}]
});

const Unity = module.exports = mongoose.model('Unity', UnitySchema);