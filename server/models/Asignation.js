const mongoose = require('mongoose');
const {Schema} = mongoose;

const AsignationSchema = new Schema({
    account_code: {type: String, ref: 'Cuenta', required: true},
    value: {type: String, required: true}
});

module.exports = mongoose.model('Asignation', AsignationSchema);
