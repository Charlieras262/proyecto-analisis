const Subject = require('../models/Subject');
const SubjectController = {};

SubjectController.getSubjects = async (req, res) => {
    await Subject.find().populate('unities').exec((err, subject) => {
        if (err) throw err;
        if (!subject) {
            return res.json({ success: false, msg: 'Subjects not found' })
        } else {
            return res.json(subject);
        }
    });
}

SubjectController.getSubject = async (req, res) => {
    const subject = await Subject.findById(req.params.id);
    res.json(subject);
}

SubjectController.createSubject = async (req, res) => {
    const subject = new Subject(req.body);
    await subject.save();
    res.json({
        status: 'Subject created'
    });
}


SubjectController.updateSubject = async (req, res) => {
    const subject = new Subject(req.body);
    await Subject.findByIdAndUpdate(req.params.id, subject);
    res.json({
        status: 'Subject Updated'
    });
}

SubjectController.deleteSubject = async (req, res) => {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Subject Deleted'
    });
}

module.exports = SubjectController;