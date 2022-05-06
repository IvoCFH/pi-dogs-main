import { SearchBar } from './search-bar'
import { render, screen } from '@testing-library/react'

describe('Search Bar Tests', () => {
    it('Should render a form with and id called "form"', () => {
        render(<SearchBar/>)
        expect(document.getElementById('form').tagName).toBe('FORM')      
    })

    describre('Form should have two children')
})