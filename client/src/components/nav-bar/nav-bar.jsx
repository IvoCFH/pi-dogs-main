import './nav-bar.css';
import { Component } from 'react';
import { Link } from 'react-router-dom'

export default class NavBar extends Component {

    render() {
        return (
            <div className='nav-bar'>
                <div className='link-container'>
                    <Link to='/breeds' className='nav-link'> <p className='linkText'>Breeds</p></Link>
                    <Link to='/temperaments' className='nav-link'> <p className='linkText'>Temperaments</p></Link>
                    <Link to='/create-breed' className='nav-link'> <p className='linkText'>Create</p></Link>
                </div>
            </div>
        )
    }
}

