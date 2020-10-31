const express = require('express');
const router = express.Router();
const passport = require('passport')

const career = require('../controllers/asignations.controller');

router.get('/', passport.authenticate('jwt', { session: false }), career.getAsignations);
router.get('/:id', passport.authenticate('jwt', { session: false }), career.getAsignation);
router.post('/', passport.authenticate('jwt', { session: false }), career.createAsignation);
router.put('/:id', passport.authenticate('jwt', { session: false }), career.editAsignation);
router.delete('/:id', passport.authenticate('jwt', { session: false }), career.deleteAsignation);

module.exports = router;