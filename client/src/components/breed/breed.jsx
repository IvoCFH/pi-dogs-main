import './breed.css';
import { Component } from 'react';
import { connect } from 'react-redux';

export class Breed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breed: {}            
        }
    }
    
    render() {
        return (
            <div className='breedContainer'>
                {this.props.breed}
            </div>
        )
    };
}

function mapStateToProps(state) {
    
};

function mapDispatchToProps(dispatch) {

};

export default connect(mapStateToProps, mapDispatchToProps)(Breed);