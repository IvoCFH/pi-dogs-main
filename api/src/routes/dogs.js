const { Router } = require('express');
const router = Router();
const { Dog, Temper, Op } = require('../db');
const { generateId, checkTempers } = require('../utils/utils')

// GET dogs | dogs?name=''
router.get('/', async function(req, res) {
    // Si hay un parametro por query /dogs?name=...
    if(req.query.name){
        const queryBreeds = await Dog.findAll({
            where: {
                [Op.contains]: {name: req.query.name}
            }
        });
        res.json(queryBreeds.map(elem => {
            return {
                name: elem.name,
                weight: elem. weight,
                temp: queryBreeds.getTempers()
            }
        }));
    }

    // Si no entran parámetros por query...
    else {
        const localDogs = await Dog.findAll();
        res.json(localDogs.map(elem => {
            return {
                name: elem.name,
                weight: elem. weight,
                temp: queryDogs.getTempers(),
            }
        }));
    };
});

// GET dogs/:idRaza
router.get('/:idRaza', async function(req, res) {
    const {breedDetail} = await Dog.findByPk(req.params.idRaza);
    res.json(breedDetail);
});

// POST dogs/
router.post('/', async function(req, res) {
    try {
        let id = await generateId('dog');
        const { name, weight, height, maxAge } = req.body;
        const newBreed = {
            id: id,
            name: name,
            weight: weight,
            height: height,
            maxAge: maxAge
        };
        const createdBreed = await Dog.create(newBreed);
        let temperIds = await checkTempers(req.body.temper);
        if (temperIds.length > 0) await createdBreed.setTempers(temperIds);
        res.status(201).json(createdBreed);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({error: 'Internal Server error 500'})
    };
});

module.exports = router;