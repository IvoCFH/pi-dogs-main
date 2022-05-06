import { render, screen } from '@testing-library/react';
import { setBreedName } from './index'

xdescribe('Actions Tests', () => {
    it('Should return a function', () => {
      expect(typeof(setBreedName(''))).toBe('function');
      
    })
})
