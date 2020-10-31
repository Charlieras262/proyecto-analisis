const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
    cod_inst: { type: String, ref: 'Institution',required: true },
    name: { type: String, required: true },
    cod_course: { type: String, required: true },
    cod_teacher: { type: String, ref: 'Teacher',required: true },
    pensum: { type: Schema.ObjectId, ref: 'Pensum', required: true },
    score: { type: Schema.ObjectId, ref: 'Score', required: true}
});

const Course = module.exports = mongoose.model('Course', CourseSchema);

module.exports.getCoursebyCode = function(id, callback) {
    var query = { cod_course: id };
    Course.findOne(query, callback);
}