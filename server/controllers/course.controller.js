const Course = require('../models/Course')
const Score = require('../models/Score');
const Pensum = require('../models/Pensum');
const Unity = require('../models/Unity');
const Subject = require('../models/Subject');
const Validations = require('../controllers/validations/general.validation');
const CourseController = {}

CourseController.getCoursesAmount = async (req, res) => {
    res.json(await Course.find().countDocuments());
}

CourseController.getCourses = async (req, res) => {
    await Course.find().populate({
        path: 'pensum',
        populate: {
            path: 'unities',
            populate: {
                path: 'subjects',
            }
        }
    }).exec((err, course) => {
        if (err) throw err;
        if (!course) {
            return res.json({ success: false, msg: 'Courses not found' })
        } else {
            Course.populate(course, {path: 'score'}, (err, score) => {
                if (err) throw err;
                Course.populate(score, {path: 'cod_teacher'}, (err, teacher) => {
                    if (err) throw err;
                    Course.populate(teacher, {path: 'cod_inst'}, (err, inst) => {
                        if (err) throw err;
                        res.json(inst);
                    })
                })
            });
        }
    });
}

CourseController.getCourse = async (req, res) => {
    await Course.findById(req.params.id).populate({
        path: 'pensum',
        populate: {
            path: 'unities',
            populate: {
                path: 'subjects',
            }
        }
    }).exec((err, course) => {
        if (err) throw err;
        if (!course) {
            return res.json({ success: false, msg: 'Courses not found' })
        } else {
            Course.populate(course, {path: 'score'}, (err, score) => {
                if (err) throw err;
                Course.populate(score, {path: 'cod_teacher'}, (err, teacher) => {
                    if (err) throw err;
                    res.json(teacher);
                })
            });
        }
    });
}

CourseController.createCourse = async (req, res) => {
    const data = req.body;
    const course = new Course({
        cod_inst: data.inst, 
        name: data.name, 
        cod_teacher: data.prof, 
        cod_course: await Validations.generateCourseCode()
    });
    const score = new Score();
    const pensum = new Pensum({name: data.name, unities: []});
    const unitiesData= data.pensum.unities;
    for(let i = 0; i < unitiesData.length; i++){
        const unity = new Unity({number: unitiesData[i].number, subjects: []});
        for(let j = 0; j < unitiesData[i].subjects.length; j++){
            const subject = new Subject({name: unitiesData[i].subjects[j].name, content_help: unitiesData[i].subjects[j].contentHelp});
            await subject.save()
            unity.subjects.push(subject._id);
        }
        await unity.save();
        pensum.unities.push(unity._id);
    }
    await pensum.save();
    await score.save();
    course.pensum = pensum._id;
    course.score = score._id;
    console.log(course);
    await course.save();
    res.json({
        msg: 'courseCreated',
        success: true
    });
}


CourseController.updateCourse = async (req, res) => {
    const course = new Course(req.body);
    await Course.findByIdAndUpdate(req.params.id, course);
    res.json({
        status: 'Course Updated'
    });
}

CourseController.deleteCourse = async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Course Deleted'
    });
}

module.exports = CourseController;
