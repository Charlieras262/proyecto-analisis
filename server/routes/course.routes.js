const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/course.controller');

router.get('/amount', controller.getCoursesAmount);
// Obtener Cursos
router.get('/', passport.authenticate('jwt', { session: false }), controller.getCourses);
// Obtener Curso por id
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getCourse);
// Crear Curso
router.post('/', passport.authenticate('jwt', { session: false }), controller.createCourse);
// Actualizar curso
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.updateCourse);
// Eliminar Curso
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.deleteCourse);

module.exports = router;