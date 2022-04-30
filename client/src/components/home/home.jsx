import './home.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../search-bar/search-bar';
import Filters from '../filters/filters';
import BreedList from '../breedList/breedList';
import NavBar from '../nav-bar/nav-bar';

export class Home extends Component {
    
    
    render() {
        return (
            <>
                <div className='background'>    
                </div>
                <div className='home-container'>
                    <SearchBar />
                    <div className='visualizer'>
                        <Filters />
                        <BreedList />
                    </div>
                </div>
            </>
        )
    };
}

function mapStateToProps(state) {
    return {}
};

function mapDispatchToProps(dispatch) {
    return {}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home) 
