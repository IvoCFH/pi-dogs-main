import './breedList.css';
import { Component } from 'react';
import Breed from '../breed/breed';

export default function breedList({ breedArray }) {
    return (
        <div className='listContainer'>
            {breedArray.map( breed => {
                return (
                    <Breed breed={breed}/>
                )
            })}
        </div>
    )
}