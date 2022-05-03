// CLEAN STATES REGISTERS
export function clearState() {
    return { type: 'CLEAR_STATE' }
}


//GET ALL BREEDS
export function getAllBreeds() {
    return function(dispatch) {
        return fetch('http://localhost:3001/dogs', { method: 'GET' } )
            .then( data => data.json())
            .then( json => {
                console.log(json);
                dispatch({ type: 'GET_ALL_BREEDS', payload: json });
                }
            )            
    }
}

// GET BREEDS BY NAME
export function getBreedsByName( breedName, options ) {
    console.log('actions');
    console.log(breedName);
    console.log(options);
    let url = `http://localhost:3001/dogs?name=${breedName}`;
    if ( options ) {
        const { prop, order, temper, getData } = options;
        if (prop && order) url += `&prop=${prop}&order=${order}`;
        if (getData) url += `&getData=${getData}`;
    }
    return function(dispatch) {
        // ESTO ES PARA ANULAR LA SOLICITUD QUE SE HACE CON CADA TYPEO EN LA BARRA DE BUSQUEDA
        // if ( target === 'form' ) {
            return fetch(url, { method: 'GET' })
                .then( data => data.json())
                .then( json => {
                    console.log(json)
                    dispatch({ 
                        type: 'GET_BREEDS_BY_NAME', 
                        payload: { searchedBreed: breedName, data: json }
                    })
                })
                .catch( err => console.log(err) )       
        // }
    }


    // return function(dispatch) {
    //     // ESTO ES PARA ANULAR LA SOLICITUD QUE SE HACE CON CADA TYPEO EN LA BARRA DE BUSQUEDA
    //     // if ( target === 'form' ) {
    //         return fetch(`http://localhost:3001/dogs?name=${breedName}&prop=${prop}&order=${order}`, { method: 'GET' })
    //             .then( data => data.json())
    //             .then( json => {
    //                 console.log(json)
    //                 dispatch({ 
    //                     type: 'GET_BREEDS_BY_NAME', 
    //                     payload: { searchedBreed: breedName, data: json }
    //                 })
    //             })
    //             .catch( err => console.log(err) )       
    //     // }
    // }}




}
/*
// GET ORDERED BREEDS BY NAME
export function getBreedsByName( breedName, target ) {
    return function(dispatch) {
        if ( target === 'form' ) {
            return fetch(`http://localhost:3001/dogs?name=${breedName}`, { method: 'GET' })
                .then( data => data.json())
                .then( json => {
                    console.log(json)
                    dispatch({ 
                        type: 'GET_BREEDS_BY_NAME', 
                        payload: { data: json, target: target }
                    })
                })
                .catch( err => console.log(err) )       
        }
    }
}*/

// GET BREED DETAIL
export function getBreedDetail(breedId, ext) {
    return function(dispatch) {
            return fetch(`http://localhost:3001/dogs/${breedId}?ext=${ext}`, { method: 'GET' })
                .then( data => data.json())
                .then( json => {
                    console.log(json);
                    dispatch({ type: 'GET_BREED_DETAIL', payload: {data: json} })
                });
    };
};

// CREATE BREED IN LOCAL DATABASE
export function createBreed(breed) {
    console.log(JSON.stringify(breed))
    return function(dispatch) {
        fetch( 'http://localhost:3001/dogs', { 
            method: 'POST',
            body: JSON.stringify(breed),
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }, 
        })
            .then( data => data.json() )
            .then( json => {
                dispatch({ type:'CREATE_BREED', payload: json });
            });
    };
};