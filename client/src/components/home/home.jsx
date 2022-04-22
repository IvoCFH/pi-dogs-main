import './home.css';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import SearchBar from '../search-bar/search-bar';
import Filters from '../filters/filters';
import BreedList from '../breedList/breedList';

export default function Home() {
        return (
            <>
                <div className='background'>    
                </div>
                <div className='home-container'>
                    <SearchBar />
                    <div className='visualizer'>
                        <Filters />
                        <BreedList breedArray={['Chiwawa','Dogo', 'RotWiller']}/>
                    </div>
                </div>
            </>
        )
    }
