const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/subject.controller');

// Obtener Subjects
router.get('/', /*passport.authenticate('jwt', {session:false}),*/ controller.getSubjects);
// Obtener Subject por id
router.get('/:id', /*passport.authenticate('jwt', {session:false}),*/ controller.getSubject);
// Crear Subject
router.post('/', /*passport.authenticate('jwt', {session:false}),*/ controller.createSubject);
// Actualizar subject
router.put('/:id', /*passport.authenticate('jwt', {session:false}),*/ controller.updateSubject);
// Eliminar Subject
router.delete('/:id', /*passport.authenticate('jwt', {session:false}),*/ controller.deleteSubject);

module.exports = router;