const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeacherSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    fnac: { type: String, required: true },
    cui: { type: String, required: true },
    esp: { type: String, required: true },
    valCode: {type: String, required: true},
    asings: { type: Number, required: false, default: 0},
    alert: [{ type: Schema.ObjectId, ref: 'Alert', required: false }]
});

const Teacher = module.exports = mongoose.model('Teacher', TeacherSchema);

module.exports.getTeacherbyCode = function(id, callback) {
    var query = { code: id };
    Teacher.findOne(query, callback);
}