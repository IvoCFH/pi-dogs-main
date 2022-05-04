const { Router } = require('express');
const router = Router();
const { Temper } = require('../db');
const axios = require("axios");
const { DOGS_API_KEY } = process.env;
const { checkTempers } = require('../utils/utils')

router.get('/', async function(req, res) {

    // Temperamentos externos
    const extTempers = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${DOGS_API_KEY}`)
        .then( async data => {
            if ( data.data.length > 0 ) {
                let elemTempers = await Promise.all( data.data.map(async breed => {
                    if ( breed.temperament ) {
                        return breed.temperament.split(', ');
                    }
                }))
                if ( elemTempers.length > 0 ) {
                    for (let x=0; x < elemTempers.length; x++ ) {
                        await checkTempers(elemTempers[x])
                    }
                }
            }
            else return []
        })
        .catch( error => new Error(error))
        
        // Temperamentos locales
        const localTempers = await Temper.findAll();
        
        res.json(localTempers);
});

module.exports = router;
