const Teacher = require('../models/Teacher');
const Validation = require('../controllers/validations/general.validation');
const History = require('../models/History');
const TeacherController = {};

TeacherController.getTeachersAmount = async (req, res) => {
  res.json(await Teacher.find().countDocuments());
}

TeacherController.getTeachers = async (req, res) => {
  const teacher = await Teacher.find();
  if (!teacher) {
    return res.json({ success: false, msg: 'Teachers not found' })
  } else {
    return res.json(teacher);
  }
}

TeacherController.getTeacher = async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    return res.json({ success: false, msg: 'Teacher not found' })
  } else {
    return res.json(teacher);
  }
}

TeacherController.createTeacher = async (req, res) => {
  const teacher = new Teacher(req.body);
  teacher._id = await Validation.generateTeacherCode();
  teacher.valCode = await Validation.generateVerifyCode('P')
  teacher.save(async error => {
    if (!error) {
      const bf = await Institution.find().countDocuments()
      const history = new History({ from: 'dashboard_su.prof', bf, current: bf + 1, date: Date(), description: '' });
      await history.save()
      res.json({
        success: true,
        msg: 'profCreated'
      });
    } else {
      res.json({
        success: false,
        msg: 'error'
      });
    }
  });
}


TeacherController.updateTeacher = async (req, res) => {
  const teacher = new Teacher(req.body);
  await Teacher.findByIdAndUpdate(req.params.id, teacher);
  res.json({
    status: 'Teacher Updated'
  });
}

TeacherController.deleteTeacher = async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  const bf = await Institution.find().countDocuments()
      const history = new History({ from: 'dashboard_su.prof', bf, current: bf - 1, date: Date(), description: '' });
      await history.save()
  res.json({
    msg: 'profDeleted'
  });
}

module.exports = TeacherController;