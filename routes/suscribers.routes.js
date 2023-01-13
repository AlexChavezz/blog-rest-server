const { Router } = require('express');
const router = Router();
const { addSuscriber } = require('../controllers/suscribers.controllers');


router.post('/add', addSuscriber)

module.exports = router;