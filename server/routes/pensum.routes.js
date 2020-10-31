const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/pensum.controller');

// Obtener Pensums
router.get('/', /*passport.authenticate('jwt', {session:false}),*/ controller.getPensums);
// Obtener Pensum por id
router.get('/:id', /*passport.authenticate('jwt', {session:false}),*/ controller.getPensum);
// Crear Pensum
router.post('/', /*passport.authenticate('jwt', {session:false}),*/ controller.createPensum);
// Actualizar pensum
router.put('/:id', /*passport.authenticate('jwt', {session:false}),*/ controller.updatePensum);
// Eliminar Pensum
router.delete('/:id', /*passport.authenticate('jwt', {session:false}),*/ controller.deletePensum);

module.exports = router;