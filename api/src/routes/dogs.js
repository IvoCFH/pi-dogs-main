const { Router } = require('express');
const router = Router();
const { Dog, Temper, Op } = require('../db');
const { generateId, checkTempers } = require('../utils/utils')
const { DOGS_API_KEY } = process.env;
const axios = require("axios")

// GET dogs | dogs?name=''
router.get('/', async function(req, res) {
    // Si hay un parametro por query /dogs?name=...
    if(req.query.name){
        const queryBreeds = await Dog.findAll({
            where: {
                name: {
                    [Op.startsWith]: req.query.name
                }
            }
        });
        const newArrBreeds = await Promise.all(queryBreeds.map(async elem => {
            let temper = await elem.getTempers();
            return {
                id: elem.id,
                name: elem.name,
                weight: elem. weight,
                temper: temper.map(temper => temper.name),
                imgUrl: '',
                external: false
            }
        }));
        
        let extBreeds = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${req.query.name}&api_key=${DOGS_API_KEY}`)
            .then( data => {return data.data})
            
        let newExtBreeds = await Promise.all(extBreeds.map( async elem => {
            let imgUrl = await axios(`https://api.thedogapi.com/v1/images/${elem.reference_image_id}`)
                .then( imgData => {return imgData.data.url})
            return {
                id: elem.id,
                name: elem.name,
                weight: elem.weight.metric,
                temper: elem.temperament.split(', '),
                imgUrl: imgUrl,
                external: true
            }
        }));
        console.log(newExtBreeds)
        
        res.json([...newArrBreeds, ...newExtBreeds])

        // axios(`https://api.thedogapi.com/v1/breeds/search?q=${req.query.name}&api_key=${DOGS_API_KEY}`)
        //     .then( data => {
        //         let extBreeds = data.data[0];
        //         console.log(extBreeds);
        //         axios(`https://api.thedogapi.com/v1/images/${extBreeds.reference_image_id}`)
        //             .then( imgData => {
        //                 let image = imgData.data.url
        //                 console.log(image);
                        
        //             })
        //     })
    }

    // Si no entran parámetros por query...
    else {
        const allBreeds = await Dog.findAll();          
        const newArrBreeds = await Promise.all(allBreeds.map(async elem => {
            let temper = await elem.getTempers();
            let breed = {
                id: elem.id,
                name: elem.name,
                weight: elem. weight, 
                temper: temper.map(temper => temper.name) 
            }
            return breed
        }));
        
        res.json(await newArrBreeds)
    };
});

// GET dogs/:idRaza?ext=true / false
router.get('/:idRaza', async function(req, res) {
    // el perro elegido es de la api externa
    if (req.query.ext) {
        let extBreedDetail = await axios(`https://api.thedogapi.com/v1/breeds/${req.params.idRaza}?api_key=${DOGS_API_KEY}`);
        console.log(extBreedDetail)
    }
    // el perro elegido es de la base de datos
    else {
        const breedDetail = await Dog.findByPk(req.params.idRaza);
        if (!!breedDetail) {
            let tempers = await breedDetail.getTempers();
            let finalDetail = tempers.map(temper => temper.name);
            res.json({ 
                name: breedDetail.name,
                temper: finalDetail,
                height: breedDetail.height,
                weight: breedDetail.weight,
                maxAge: breedDetail.maxAge
            });
        }
        else {
            res.status(404).json({
                error: 'Dog ID requested not found'
            }) 
        }
    }
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