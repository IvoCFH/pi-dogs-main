import './breed.css';
import { Component, } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


export class BreedCard extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { id, breed, weight, temper } = this.props
        return (
            <Link to={`/breed/${id}`}>
                <div className='breedContainer'>
                    Name: {breed} <br />
                    Weight: {weight} <br />
                    Temper: {temper}
                </div>
            </Link>
        )
    };
}

function mapStateToProps(state) {
    
};

function mapDispatchToProps(dispatch) {

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BreedCard);