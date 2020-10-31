const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/unity.controller');

// Obtener Unitys
router.get('/', /*passport.authenticate('jwt', {session:false}),*/ controller.getUnitys);
// Obtener Unity por id
router.get('/:id', /*passport.authenticate('jwt', {session:false}),*/ controller.getUnity);
// Crear Unity
router.post('/', /*passport.authenticate('jwt', {session:false}),*/ controller.createUnity);
// Actualizar unity
router.put('/:id', /*passport.authenticate('jwt', {session:false}),*/ controller.updateUnity);
// Eliminar Unity
router.delete('/:id', /*passport.authenticate('jwt', {session:false}),*/ controller.deleteUnity);

module.exports = router;