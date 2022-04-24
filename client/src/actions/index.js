
// GET ALL BREEDS
export function getAllBreeds() {
    return function(dispatch) {
        return fetch('http://localhost:3001/dogs', { method: 'GET' } )
            .then( data => data.json())
            .then( json => {
                console.log(json);
                dispatch({ type: 'GET_ALL_BREEDS', payload: json })
            })
    }
}

// GET BREEDS BY NAME
export function getBreedsByName(breedName) {
    return function(dispatch) {
        console.log('action breedName: ' + breedName)
        return fetch(`http://localhost:3001/dogs?name=${breedName}`, { method: 'GET' })
            .then( data => data.json())
            .then( json => {
                console.log(json);
                dispatch({ type: 'GET_BREEDS_BY_NAME', payload: json })
            })
    }
}

// GET BREED DETAIL
export function getBreedDetail(breedId) {
    return function(dispatch) {
        return fetch(`localhost:3001/dogs/${breedId}`, { method: 'GET' })
            .then( data => data.json())
            .then( json => {
                dispatch({ type: 'GET_BREED_DETAIL', payload: json })
            });
    };
};

// CREATE BREED IN LOCAL DATABASE
export function createBreed(breed) {
    return function(dispatch) {
        fetch( 'localhost:3001/dogs', { method: 'POST' } )
            .then( data => data.json() )
            .then( json => {
                dispatch({ type:'CREATE_BREED', payload: json });
            });
    };
};