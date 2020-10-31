const express = require('express');
const passport = require('passport');
const router = express.Router();

const institution = require('../controllers/institution.controller');

router.get('/amount', institution.getInstitutionsAmount);
router.get('/', passport.authenticate('jwt', { session: false }), institution.getInstitutions);
router.get('/:id', passport.authenticate('jwt', { session: false }), institution.getInstitution);
router.post('/', passport.authenticate('jwt', { session: false }), institution.createInstitution);
router.put('/:id', passport.authenticate('jwt', { session: false }), institution.editInstitutions);
router.delete('/:id', passport.authenticate('jwt', { session: false }), institution.deleteInstitutions);

module.exports = router;