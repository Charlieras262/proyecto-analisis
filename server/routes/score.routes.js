const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/score.controller');

// Obtener Cursos
router.get('/', /*passport.authenticate('jwt', {session:false}),*/ controller.getScores);
// Obtener Curso por id
router.get('/:id', /*passport.authenticate('jwt', {session:false}),*/ controller.getScore);
// Crear Curso
router.post('/', /*passport.authenticate('jwt', {session:false}),*/ controller.createScore);
// Actualizar curso
router.put('/:id', /*passport.authenticate('jwt', {session:false}),*/ controller.updateScore);
// Eliminar Curso
router.delete('/:id', /*passport.authenticate('jwt', {session:false}),*/ controller.deleteScore);

module.exports = router;