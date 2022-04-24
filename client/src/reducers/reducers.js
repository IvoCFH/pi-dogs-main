const initialState = {
    filteredBreeds: [],
    searchedBreeds: [],
    breedDetail: {}
}

// function rootReducer(state = initialState, action) {
function rootReducer(state = initialState, { type, payload }) {
    console.log('root reducer:')
    console.log(type);
    console.log(payload);
    if ( type === 'GET_ALL_BREEDS' || type === 'GET_BREEDS_BY_NAME' ) {
        if ( payload.target === 'breedName' ) {
            return {
                ...state,
                searchedBreeds: payload.data
            }    
        }
        if ( payload.target === 'form' ) {
            return {
                ...state,
                filteredBreeds: payload.data
            }
        }
    };

    if ( type === 'GET_BREED_DETAIL' ) {
        return {
            ...state,
            breedDetail: payload.data
        }
    };

    if ( type === 'CLEAR_STATE' ) {
        return {
            ...state,
            filteredBreeds: []
        }
    }

    return state
};

export default rootReducer;

// aca podemos hacer algo para cuando se crea un perro en la BD local.