import './breedList.css';
import { Component } from 'react';
import { connect } from 'react-redux';
import { BreedCard } from '../breed/breed';
import { getBreedDetail } from '../../actions';

export class BreedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false
        }
    }
    

    componentDidUpdate( prevProps, prevState ) {
        // console.log('breedList updated');
        // console.log(prevProps.filteredBreeds);
        // console.log(this.props.filteredBreeds);
    }

    render() {
        if (this.props.filteredBreeds.length !== 0) {
            return (
                <div className='listContainer'>
                    {this.props.filteredBreeds.map( breed => {
                        let temper = breed.temper.join(', ');
                        return (
                            <BreedCard 
                                key = { breed.id }
                                id = { breed.id }
                                breed = { breed.name }
                                weight = { breed.weight }
                                temper = { temper }
                            />
                        )
                    })}
                </div>
            )
        }
        else {
            return (
                <div className='listContainer'>
                    <div className='noBreedsLoaded'>
                        Search for your favourite breed!
                    </div>
                </div>
            )
        }
    }
}


function mapStateToProps(state) {
    return {
        filteredBreeds: state.filteredBreeds
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getBreedDetail: breedName => dispatch(getBreedDetail(breedName))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BreedList) 
