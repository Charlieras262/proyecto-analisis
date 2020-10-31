const express = require('express');
const passport = require('passport');
const router = express.Router();

const history = require('../controllers/history.controller');

router.get('/amount', history.getHistoriesAmount);
router.get('/:group', history.getHistories);
router.get('/:id', passport.authenticate('jwt', { session: false }), history.getHistory);
router.post('/', passport.authenticate('jwt', { session: false }), history.createHistory);
router.put('/:id', passport.authenticate('jwt', { session: false }), history.editHistories);
router.delete('/:id', passport.authenticate('jwt', { session: false }), history.deleteHistories);

module.exports = router;