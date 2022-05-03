const { Router } = require('express');
const router = Router();
const { Dog, Op } = require('../db');
const { generateId, checkTempers, quickSort } = require('../utils/utils')
const { DOGS_API_KEY } = process.env;
const axios = require("axios");


// GET dogs | dogs?name=''&order=''&filter=''&ext=''
// name = breed name
// order = none | a-z | z-a | min-max | max-min
// filter = temper
router.get('/', async function(req, res) {
    let { name, prop, order, temper, getData } = req.query;
    // Si hay un parametro por query /dogs?name=...
    if(name) {
        // Declaro el array total
        let totalBreeds = [];

        // Si no se especifica ext o ext = false, hago el GET a la base de datos.
        // Lo obtenido se inserta en totalBreeds
        if ( !getData || getData === 'both' || getData === 'local' ) {
            // Consulta a la base de datos por todas las razas que contengan el string proporcionado
            const queryBreeds = await Dog.findAll({
                where: {
                    name: {
                        [Op.startsWith]: name
                    }
                }
            });
            // Arma el array de breed LOCALES.
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
            totalBreeds = [ ...totalBreeds, ...newArrBreeds ];
        }

        // Si no se especifica ext o ext = true, hago el GET a la API externa
        // Lo obtenido se inserta en totalBreeds
        if ( !getData || getData === 'both' || getData === 'external' ) {
            // Consulta a la api externa por todas las razas que contengan el string proporcionado
            const extBreeds = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${DOGS_API_KEY}`)
                .then( data => {
                    return data.data
                })
                .catch( error => console.log(error) )
            // Arma el array de breed EXTERNOS.
            const newExtBreeds = await Promise.all(extBreeds.map( async elem => {
                let imgUrl = '';
                let tempers = [];
                // En los breed externos, se busca por el número de referencia de imagen, para luego
                // hacer la solicitud de la misma a la API.
                if ( !!elem.reference_image_id ) {
                    // Devuelve la URL de la imagen
                    imgUrl = await axios(`https://api.thedogapi.com/v1/images/${elem.reference_image_id}`)
                        .then( imgData => {
                            return imgData.data.url
                        })
                        .catch( error => console.log(error) )
                };
                // Tambien se fija los temperamentos (si los hubiese) y hace un split para manejarlo
                // como un array para fines de la API.         
                if ( !!elem.temperament ) tempers = elem.temperament.split(', ');
                return {
                    id: elem.id,
                    name: elem.name,
                    weight: elem.weight.metric,
                    temper: tempers,
                    imgUrl: imgUrl,
                    external: true
                }
            }));
            totalBreeds = [ ...totalBreeds, ...newExtBreeds ];
        }

        // Si el array totalBreeds contiene algo:
        if ( totalBreeds.length > 0 ) {
            // if ( temper ) totalBreeds = totalBreeds.filter( breed => breed.temper );
            if ( order ) totalBreeds = quickSort(totalBreeds, prop, order);
        }

        res.json(totalBreeds)
        
    }
    else {
        res.json({})
    }

    // Si no entran parámetros por query pide todos... - NO SE USA POR AHORA
    // else {
    //     const allBreeds = await Dog.findAll();          
    //     const newArrBreeds = await Promise.all(allBreeds.map(async elem => {
    //         let temper = await elem.getTempers();
    //         let breed = {
    //             id: elem.id,
    //             name: elem.name,
    //             weight: elem. weight, 
    //             temper: temper.map(temper => temper.name) 
    //         }
    //         return breed
    //     }));
        
    //     res.json(await newArrBreeds)
    // };
});

// GET dogs/:idRaza?ext=true / false
router.get('/:idRaza', async function(req, res) {
    // el perro elegido es de la api externa
    if (req.query.ext === 'true') {
        const extBreedDetail = await axios(`https://api.thedogapi.com/v1/breeds/${req.params.idRaza}?api_key=${DOGS_API_KEY}`)
            .then( data => {return data.data})
            .catch( errr => console.log(err))
        if ( !!extBreedDetail.name ) {
            let imgUrl = await axios(`https://api.thedogapi.com/v1/images/${extBreedDetail.reference_image_id}`)
                .then( imgData => {
                    return imgData.data.url
                })
                .catch( error => console.log(error) )
            console.log(extBreedDetail)
            res.json({ 
                name: extBreedDetail.name,
                temper: extBreedDetail.temperament,
                height: extBreedDetail.height.metric,
                weight: extBreedDetail.weight.metric,
                maxAge: extBreedDetail.life_span,
                imgUrl: imgUrl
            });
        }
        else {
            res.status(404).json({
                error: 'Dog ID requested not found'
            }) 
        }
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