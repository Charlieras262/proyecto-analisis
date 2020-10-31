const express = require('express');
const router = express.Router();
const passport = require('passport')

const cuentaCRTL = require('../controllers/cuenta.controller');

router.get('/', passport.authenticate('jwt', { session: false }), cuentaCRTL.getCuentas);
router.get('/:id', passport.authenticate('jwt', { session: false }), cuentaCRTL.getCuenta);
router.post('/', passport.authenticate('jwt', { session: false }), cuentaCRTL.createCuenta);
router.put('/:id', passport.authenticate('jwt', { session: false }), cuentaCRTL.editCuenta);
router.delete('/:id', passport.authenticate('jwt', { session: false }), cuentaCRTL.deleteCuenta);

module.exports = router;