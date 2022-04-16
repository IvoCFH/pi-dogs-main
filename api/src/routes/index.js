const { Router } = require('express');
// const authRouter = require('./auth');
const dogsRouter = require('./dogs');
const temperRouter = require('./temper');

const router = Router();

router.use('/dogs', dogsRouter);
router.use('/temperament', temperRouter);
router.get('/', (req, res) => {
    res.send('Root Route - LANDING PAGE');
});


module.exports = router;
