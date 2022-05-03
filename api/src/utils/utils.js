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


function quickSort(array, prop, order) {
    // console.log('Initiate quickSort')
    let pivot = [];
    // [{
    //     id: elem.id,
    //     name: elem.name,
    //     weight: elem.weight.metric,
    //     temper: tempers,
    //     imgUrl: imgUrl,
    //     external: true
    // }]

    // console.log(array.length)
    // console.log(prop)
    // console.log(order)

    // console.log(array)
    if (array.length === 1) {
        pivot.push(array[0]);  
        return pivot;
    }
    else if (array.length > 1) {
        pivot = [array.shift()];    
        let arr_m = [];
        let arr_M = [];
        let code = 0;
        let pCode = 0;

        
        for (let x = 0; x < array.length; x++) {
            if ( order === 'a-z' || order === 'z-a' ) {
                if ( !!array[x][prop] ) code = array[x][prop].toLowerCase().charCodeAt(0)
                else code = 0;
                if ( pivot.length > 0 ) pCode = pivot[0][prop].toLowerCase().charCodeAt(0)
                else pCode = 0;
                // console.log(code);
                // console.log(pCode);
            }
            else if ( order === 'min-max' || order === 'max-min' ) {
                if ( !!array[x][prop] ) {
                    code = Number(array[x][prop].toLowerCase().slice(0,2));
                }
                else code = 0;
                if ( pivot.length > 0 ) {
                    pCode = Number(pivot[0][prop].toLowerCase().slice(0,2));
                }
                else pCode = 0;
            }

            if ( order === 'a-z' || order === 'min-max' ) {
                
                if (code < pCode) {
                    // console.log('lesser');
                    arr_m.push(array[x]);
                }
                else if (code >= pCode) {
                    // console.log('greater or equal');
                    arr_M.push(array[x]);
                }
            }
            else if ( order === 'z-a' || order === 'max-min' ) {
                if (code >= pCode) {
                    // console.log('lesser');
                    arr_m.push(array[x]);
                }
                else if (code < pCode) {
                    // console.log('greater or equal');
                    arr_M.push(array[x]);
                }
            }
        }
        
        // console.log(arr_m.length);
        // console.log(arr_M.length);
        if (arr_m.length > 0 && arr_M.length > 0) {
            return quickSort(arr_m, prop, order).concat(pivot.concat(quickSort(arr_M, prop, order)));
        } 
        else if (arr_m.length > 0) {
            return quickSort(arr_m, prop, order).concat(pivot);
        }
        else if (arr_M.length > 0) {
            return pivot.concat(quickSort(arr_M, prop, order));
        }        
    }
}

// function orderBy(array, prop, order) {
//     if( !order || order === 'none' ) return arr;
//     if( order === 'a-z' ) return quickSort(array, prop, order);
    
// }

module.exports = {
    generateId,
    checkTempers,
    quickSort
}