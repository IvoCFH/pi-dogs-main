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