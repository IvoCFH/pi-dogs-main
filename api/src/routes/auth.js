const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Auth Route');
});


module.exports = router;