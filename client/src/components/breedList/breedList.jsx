import './breedList.css';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Breed } from '../breed/breed';

export class BreedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    

    render() {
        let breedArray = ['Dogo','Doverman'];
        return (
            <div className='listContainer'>
                {breedArray.map( (breed,i) => {
                    return (
                        <Breed key={i} breed={breed}/>
                    )
                })}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {}
};

function mapDispatchToProps(daspatch) {
    return {}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BreedList) 
