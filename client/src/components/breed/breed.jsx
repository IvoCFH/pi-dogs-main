import './breed.css';
import { Component, } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import dogIcon from '../../imgs/dog-icon.png'


export class BreedCard extends Component {
    render() {
        const { id, breed, weight, temper, ext, imgUrl } = this.props
        return (
            <Link to={`/breeds/${id}?ext=${ext}`} className='breed-link'>
                <img className="breed-img" src={ imgUrl !== '' ? imgUrl : dogIcon} alt={breed} />
                <div className='breed-container'>
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