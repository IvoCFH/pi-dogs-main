import './filters.css';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getAllBreeds, getBreedsByName } from '../../actions';

export class Filters extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            prop: 'name',
            order: 'a-z',
            temper: 'none',
            getData: 'both'
        }
    }
    
    handleOrder(e) {
        console.log(e.target.name)
        console.log(e.target.id)
        if (this.state.order !== e.target.id) {
            this.setState({
                ...this.state,
                order: e.target.id,
                prop: e.target.name
            })    
        }
    }

    handleGet(e) {
        console.log(e.target.name)
        console.log(e.target.id)
        if ( this.state.getData !== e.target.id ) {
            this.setState({
                ...this.state,
                getData: e.target.id
            }) 
        }
    }

    handleTemper(e) {
        console.log(e.target.name)
        console.log(e.target.id)
        if ( this.state.temper !== e.target.value ) {
            this.setState({
                ...this.state,
                temper: e.target.value
            })
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        console.log('submit')
        if ( this.props.searchedBreed ) {
            this.props.getBreedsByName(this.props.searchedBreed, this.state)
        }
        else {
            this.props.getAllBreeds(this.state);
        }
    }

    render() {
        return (
            <div className='filtersContainer'>
                <form className='filterForm'>
                    <fieldset>
                        <legend>Order by</legend>
                        <div>
                            <input 
                                type="radio"
                                id='a-z' 
                                checked={this.state.order === 'a-z' ? true : false} 
                                name='name'
                                value='a-z'
                                onChange={ e => this.handleOrder(e) }
                            />
                            <label>A &#8594; Z</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                id='z-a'
                                checked={this.state.order === 'z-a' ? true : false} 
                                name='name' 
                                value="z-a"
                                onChange={ e => this.handleOrder(e) }
                            />
                            <label>Z &#8594; A</label>
                        </div>
                        <div>
                            <input 
                                type="radio"
                                id='min-max'
                                checked={this.state.order === 'min-max' ? true : false}
                                name='weight' 
                                value='min-max'
                                onChange={ e => this.handleOrder(e) }
                            />
                            <label>Min weight</label>
                        </div>
                        
                        <div>
                            <input 
                                type="radio"
                                id='max-min'
                                checked={this.state.order === 'max-min' ? true : false}
                                name='weight' 
                                value="max-min"
                                onChange={ e => this.handleOrder(e) }
                            />
                            <label>Max weight</label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Get Data From</legend>
                            <div>
                                <input 
                                    type="radio" 
                                    id="both" 
                                    name="getData" 
                                    value="both" 
                                    checked={ this.state.getData === 'both' ? true : false}
                                    onChange={ e => this.handleGet(e) } 
                                />
                                <label>Both</label>
                            </div>
                            <div>
                                <input 
                                    type="radio" 
                                    id="local" 
                                    name="getData" 
                                    value="local"
                                    checked={ this.state.getData === 'local' ? true : false}
                                    onChange={ e => this.handleGet(e) } 
                                />
                                <label>Local DB</label>
                            </div>
                            <div>
                                <input 
                                    type="radio" 
                                    id="external" 
                                    name="getData" 
                                    value="external" 
                                    checked={ this.state.getData === 'external' ? true : false}
                                    onChange={ e => this.handleGet(e) } 
                                />
                                <label>External</label>
                            </div>
                    </fieldset>
                    <fieldset>
                        <legend>Temperament</legend>
                        <div>
                            <input 
                                className='tempFilter'
                                type="text" 
                                id="temper" 
                                name="temper" 
                                placeholder='Temperament'
                                onChange={ e => this.handleTemper(e) }
                            />
                        </div>
                    </fieldset>
                    
                    <input 
                        type="submit" 
                        value='Apply Filters' 
                        className='applyBtn'
                        onClick={ e => this.handleSubmit(e) }
                    />

                </form>
            </div>
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
        getBreedsByName: (breed, options) => dispatch(getBreedsByName(breed, options)),
        getAllBreeds: () => dispatch(getAllBreeds())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters) 
