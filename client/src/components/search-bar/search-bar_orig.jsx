import './search-bar.css';
import { Component } from 'react';
import { connect } from 'react-redux';
import { clearState, getAllBreeds, getBreedsByName } from '../../actions';

export class SearchBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            caller: '',
            breed: '',
        }
    }


    handleChange(e) {
        this.setState({ 
            breed: e.target.value, 
            caller: e.target.name 
        });
        console.log('handleChange');
        console.log(this.state);
    };

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            caller: e.target.name
        })
        console.log('handleSubmit')
        console.log(this.state)
    };

    // Si se hace un update en el componente (cambio de estado) corroboramos que el estado actual sea diferente
    // del estado previo. Si este es diferente, entonces se despacha la accion de GET Breeds 
    componentDidUpdate( prevProps, prevState ) {
        console.log('search bar updated')
        console.log(this.state)
        if ( 
            ( this.state.breed !== prevState.breed
            || this.state.caller !== prevState.caller )
            && this.state.breed !== '' 
        ) {
            this.props.getBreedsByName( this.state.breed, this.state.caller );
        }
    }


    render() {
        return (
            <form 
                name = 'form' 
                className='search-container' 
                onSubmit={ e => this.handleSubmit(e)}
            >
                <input 
                    name='breedName' 
                    className='input' 
                    type="text" 
                    placeholder='  Search for dog breed...' 
                    onChange={ e => this.handleChange(e) }
                />
                <input 
                    className='button' 
                    type='submit'
                />

            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        searchedBreeds: state.searchedBreeds
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getAllBreeds: () => dispatch(getAllBreeds()),
        getBreedsByName: ( breedName, target ) => dispatch(getBreedsByName( breedName, target )),
        clearState: () => dispatch(clearState())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar)

// --------------------------------------------------------------------------------------
// ACTIONS.JS
// GET BREEDS BY NAME
// export function getBreedsByName( breedName, target ) {
//     return function(dispatch) {
//         // ESTO ES PARA ANULAR LA SOLICITUD QUE SE HACE CON CADA TYPEO EN LA BARRA DE BUSQUEDA
//         if ( target === 'form' ) {
//             return fetch(`http://localhost:3001/dogs?name=${breedName}`, { method: 'GET' })
//                 .then( data => data.json())
//                 .then( json => {
//                     console.log(json)
//                     dispatch({ 
//                         type: 'GET_BREEDS_BY_NAME', 
//                         payload: { data: json, target: target }
//                     })
//                 })
//                 .catch( err => console.log(err) )       
//         }
//     }
// }

// --------------------------------------------------------------------------------------
// REDUCER.JS

// const initialState = {
//     filteredBreeds: [],
//     searchedBreeds: [],
//     breedDetail: {}
// }

// if ( type === 'GET_ALL_BREEDS' || type === 'GET_BREEDS_BY_NAME' ) {
//     if ( payload.target === 'breedName' ) {
//         return {
//             ...state,
//             searchedBreeds: payload.data
//         }    
//     }
//     if ( payload.target === 'form' ) {
//         return {
//             ...state,
//             filteredBreeds: payload.data
//         }
//     }
// };