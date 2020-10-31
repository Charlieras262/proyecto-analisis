const mongoose = require("mongoose");
const {Schema} = mongoose;

const PensumSchema = new Schema({
    name: {type: String, required: true},
    unities: [{type: Schema.ObjectId, ref:'Unity'}]
});

const Pensum = module.exports = mongoose.model('Pensum', PensumSchema);