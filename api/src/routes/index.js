const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const  authRouter  = require('./auth');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/auth', authRouter);

router.get('/', (req, res) => {
    res.send('Root Route');
});


module.exports = router;
