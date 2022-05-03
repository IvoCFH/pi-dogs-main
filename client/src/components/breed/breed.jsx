import './breed.css';
import { Component, } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


export class BreedCard extends Component {
    render() {
        const { id, breed, weight, temper, ext } = this.props
        return (
            <Link to={`/breeds/${id}?ext=${ext}`} className='breed-link'>
                <div className='breedContainer'>
                    Name: {breed} |
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