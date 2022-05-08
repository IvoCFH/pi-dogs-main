import './search-bar.css';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getAllBreeds, getBreedsByName, setBreedName } from '../../actions';

export class SearchBar extends Component {
    
    handleChange(e) {
        console.log('handleChange');
        this.props.setBreedName(e.target.value)
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log('submited');
        if ( !!this.props.searchedBreed && this.props.searchedBreed !== '' ) this.props.getBreedsByName( this.props.searchedBreed );
        else this.props.getAllBreeds();
        
    };

    render() {
        return (
            <form 
                name = 'form'
                id = 'form' 
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
                    className='pos-search-btn styled-btn'
                    name="submit-button"
                    value='Search' 
                    type='submit'
                />

            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        searchedBreed: state.searchedBreed
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getAllBreeds: () => dispatch(getAllBreeds()),
        getBreedsByName: breedName => dispatch(getBreedsByName( breedName )),
        setBreedName: breedName => dispatch(setBreedName( breedName ))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar)