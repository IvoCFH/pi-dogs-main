import './breed.css';
import { Component } from 'react';

export default function Breed({breed, img, temperament, weight}) {
    return (
        <div className='breedContainer'>
              {breed}
        </div>
    )
        
}