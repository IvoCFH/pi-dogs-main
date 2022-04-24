const initialState = {
    searchedBreeds: [],
    breedDetail: {}
}

function rootReducer(state = initialState, action) {
    console.log('root reducer:')
    console.log(action.type)
    if ( action.type === 'GET_ALL_BREEDS' || action.type === 'GET_BREEDS_BY_NAME' ) {
        return {
            ...state,
            searchedBreeds: state.searchedBreeds.concat(action.payload)
        }
    };

    if ( action.type === 'GET_BREED_DETAIL' ) {
        return {
            ...state,
            breedDetail: action.payload
        }
    };

    return state
};

export default rootReducer;

// aca podemos hacer algo para cuando se crea un perro en la BD local.