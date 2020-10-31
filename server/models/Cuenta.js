const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    naturaleza: { type: String, required: true },
    tipo: {type: String, required: true}
});

module.exports = mongoose.model('Cuenta', StudentSchema);