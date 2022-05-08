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
                <img className="breed-img" src={ imgUrl !== '' ? imgUrl : dogIcon} alt={breed}/>
                <div className='breed-container'>
                    <h4 className='breed-title'>{breed}</h4>
                    <b>Weight:</b> {weight} kg <br/> <br/>
                    <b>Temperament:</b><br/> {temper}
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