import './search-bar.css';
import { Component } from 'react';
import { connect } from 'react-redux';
import { clearState, getAllBreeds, getBreedsByName } from '../../actions';

export class SearchBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            breed: ''
        }
    }


    handleChange(e) {
        this.setState({ 
            breed: e.target.value, 
        });
        console.log('handleChange');
        console.log(this.state);
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log('submited');
        console.log(this.state);
        this.props.getBreedsByName( this.state.breed );
    };

    // // Si se hace un update en el componente (cambio de estado) corroboramos que el estado actual sea diferente
    // // del estado previo. Si este es diferente, entonces se despacha la accion de GET Breeds 
    // componentDidUpdate( prevProps, prevState ) {
    //     console.log('search bar updated')
    //     console.log(this.state)
    //     // if ( this.state.breed !== prevState.breed && this.state.breed !== '' ) {
    //     if (this.state.breed !== '') {
    //         this.props.getBreedsByName( this.state.breed );
    //     }
    // }


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
        getBreedsByName: breedName => dispatch(getBreedsByName( breedName )),
        clearState: () => dispatch(clearState())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar)