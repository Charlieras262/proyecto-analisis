const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/user.controller');

/* Peticionnes http al servidor */

// Obtener Usuarios
router.get('/:id/profile', passport.authenticate('jwt', { session: false }), controller.getProfile);
// Obtener Usuario por id
router.get('/:id', controller.getUser);
// Crear Usuario
router.post('/authenticate/register', controller.createUser);
//Iniciar sesion de usuario
router.post('/authenticate/login', controller.authUserInfo);
// Actualizar Usuario
router.put('/:id', controller.updateUser);
// Eliminar Usuario
router.delete('/:id', controller.deleteUser);

// Se exporta el rauter para poder utilizar sus rutas e indexar
module.exports = router;