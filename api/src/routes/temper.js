const { Router } = require('express');
const router = Router();
const { Temper } = require('../db')

router.get('/', async function(req, res) {
    const temperaments = await Temper.findAll();
    res.json(temperaments);
});

module.exports = router;