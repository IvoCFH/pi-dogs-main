import './search-bar.css';
import { useState } from 'react'; // es solo para estados de React, veremos como hacemos con el tema de Redux.

export default function SearchBar({searchBreed}) {
    
    return (
        <div className='search-container'>
            <input name='breedName' className='input' type="text" placeholder='  Search for dog breed...'/>
            <button className='button'> Search... </button>
        </div>
    )
}