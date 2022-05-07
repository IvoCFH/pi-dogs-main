import { SearchBar } from './search-bar'
import { render, screen } from '@testing-library/react'



describe('- Search Bar Tests', () => {
    it('Should render a form with and id called "form"', () => {
        render(<SearchBar/>)
        expect(document.getElementById('form').tagName).toBe('FORM')      
    })

    describe('-- Form should have two children', () => {
        
        it('Should render a text type input with name "breedName"', () => {
            render(<SearchBar/>)
            expect(document.getElementsByName('breedName').length).toBeGreaterThan(0);
        })

        it('Should render a submit button with name submit-button', () => {
            render(<SearchBar/>)
            expect(document.getElementsByName('submit-button').length).toBeGreaterThan(0);
        })
    })
})
