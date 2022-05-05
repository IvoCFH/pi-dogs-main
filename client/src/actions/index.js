// CLEAN STATES REGISTERS
export function clearDetail() {
    return { type: 'CLEAR_DETAIL' }
}

export function setBreedName(breedName) {
    return function(dispatch) {
        dispatch({
            type: 'SET_BREED_NAME',
            payload: breedName
        })
    }
}

//GET ALL BREEDS
export function getAllBreeds(options) {
    console.log('getAllBreeds action');
    console.log(options);
    let url = 'http://localhost:3001/dogs';
    if ( options ) {
        const { prop, order, temper, getData } = options;
        url += '?g=ab'
        if (prop && order) url += `&prop=${prop}&order=${order}`;
        if (getData) url += `&getData=${getData}`;
        if (temper !== 'none') url += `&temper=${temper}`;
    }
    return function(dispatch) {
        return fetch(url, { method: 'GET' } )
            .then( data => data.json())
            .then( json => {
                console.log(json);
                dispatch({ type: 'GET_ALL_BREEDS', payload: {data: json} });
                }
            )            
    }
}

// GET BREEDS BY NAME
export function getBreedsByName( breedName, options ) {
    console.log('getBreedsByName action');
    console.log(breedName);
    console.log(options);
    let url = `http://localhost:3001/dogs?name=${breedName}`;
    if ( options ) {
        const { prop, order, temper, getData } = options;
        if (prop && order) url += `&prop=${prop}&order=${order}`;
        if (getData) url += `&getData=${getData}`;
        if (temper !== 'none') url += `&temper=${temper}`;
    }
    return function(dispatch) {
        // ESTO ES PARA ANULAR LA SOLICITUD QUE SE HACE CON CADA TiPEO EN LA BARRA DE BUSQUEDA
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

}
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