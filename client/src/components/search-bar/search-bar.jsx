import './search-bar.css';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getAllBreeds, getBreedsByName } from '../../actions';

export class SearchBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            breed: ''
        }
    }


    handleChange(e) {
        this.setState({ breed: e.target.value })
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log('handleSubmit execution');
        this.props.getAllBreeds( this.state.breed )
    };

    componentDidUpdate( prevProps, prevState ) {
        if (this.state.breed !== prevState.breed && this.state.breed !== '') {
          this.props.getBreedsByName( this.state.breed );
        }
    }


    render() {
        return (
            <form 
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
        searchedDogs: state.searchedBreeds
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getAllBreeds: () => dispatch(getAllBreeds()),
        getBreedsByName: breedName => dispatch(getBreedsByName(breedName))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar)