const { Dog, Temper } = require('../db')

// Funcion para generar números de ID. Se realiza en base a los existentes en la base de datos.
async function generateId(model) {
    try {
        let exists = false;
        let id = 0;
        do {
            id++;
            if (model === 'dog') exists = await Dog.findByPk(id);
            else if (model === 'temper') exists = await Temper.findByPk(id);
        } while (exists);
        return id
    }
    catch (e) {
        console.log(e)
    }
};

// Esta funcion se genera para corroborar la existencia de los Temperamentos introducidos en la base de datos.
// Si alguno no existiera se crea en la base de datos como un temperamento nuevo.
async function checkTempers(tempNames) {
    // Incializo un array que contendrá los ids de temperamentos una vez localizados/creados
    let temperIds = []; 
    try {
        // Solo ejecutamos si el argumento no es undef o null y si el array no es vacío.
        if (!!tempNames && tempNames.length > 0) {
            for( let x=0; x < tempNames.length; x++ ) {
                // buscamos si el temperamento introducido se encuentra en la base de datos.
                let temper = await Temper.findOne({
                    where: {
                        name: tempNames[x],
                    }
                });
                // El nombre del temper no fue encontrado en la base de datos, se procede a crearlo
                if (!temper) {
                    temper = await Temper.create({
                        name: tempNames[x],
                        id: await generateId('temper'),
                    });
                }
                // se pushea en el temperIds el id encontrado/creado
                temperIds.push(temper.id);
            }
            // devolvemos array con ids,
            return temperIds;
        };
    }
    catch (e) {
        console.log(e);
        // en caso de error devolvemos vacío.
        return [];
    };
};

module.exports = {
    generateId,
    checkTempers
}