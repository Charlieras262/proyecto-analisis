const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/teacher.controller');

router.get('/amount', controller.getTeachersAmount);
// Obtener Profesores
router.get('/', passport.authenticate('jwt', {session:false}), controller.getTeachers);
// Obtener Profesor por id
router.get('/:id', passport.authenticate('jwt', {session:false}), controller.getTeacher);
// Crear Profesor
router.post('/', passport.authenticate('jwt', {session:false}), controller.createTeacher);
// Actualizar curso
router.put('/:id', passport.authenticate('jwt', {session:false}), controller.updateTeacher);
// Eliminar Profesor
router.delete('/:id', passport.authenticate('jwt', {session:false}), controller.deleteTeacher);

module.exports = router;