import './createBreed.css';
import React, { Component } from 'react';
import { createBreed } from '../../actions';
import { connect } from 'react-redux';

export class CreateBreed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            breed: {
                name: '',
                minHeight: '',
                maxHeight: '',
                minWeight: '',
                maxWeight: '',
                maxAge: '',
                tempers: []
            },
            error: {}
        }
    }

    handleChange( event ) {
        if ( event.target.name === 'tempers' ) {
            let newTempers = event.target.value.split(',').map( temper => {
                return temper.trim()
            });
            if ( newTempers[newTempers.length - 1] === '' ) {
                newTempers.reverse().shift();
                newTempers.reverse();
            }
            this.setState({
                ...this.state,
                breed: {
                    ...this.state.breed,
                    [event.target.name]: newTempers
                }
            })    
        }
        else {
            this.setState({
                ...this.state,
                breed: {
                    ...this.state.breed,
                    [event.target.name]: event.target.value
                }
            })
        }
    }

// Sets the error state of the component. If name is valid returns true, if it's not, returns
// false.
    validateName() {
        if ( this.state.breed.name === '' ) {
            this.setState({
                ...this.state,
                error: {
                    ...this.state.error,
                    name: 'Breed name is missing'
                }
            })
            return false
        } 
        else {
            this.setState({
                ...this.state,
                error: {
                    ...this.state.error,
                    name: ''
                }
            })
            return true
        }
    }

// Sets the error state of the component. If height is valid returns true, if it's not, returns
// false.
    validateHeight() {
        if ( Number(this.state.maxHeight) < Number(this.state.minHeight) ) {
            this.setState({
                ...this.state,
                error: {
                    ...this.state.error,
                    height: 'Max height cannot be lesser than min height'
                }
            })
            return false
        }
        else {
            this.setState({
                ...this.state,
                error: {
                    ...this.state.error,
                    height: ''
                }
            })
            return true
        }
    }

// Sets the error state of the component. If weight is valid returns true, if it's not, returns
// false.
    validateWeight() {
        if ( Number(this.state.maxWeight) < Number(this.state.minWeight) ) {
            this.setState({
                ...this.state,
                error: {
                    ...this.state.error,
                    height: 'Max weight cannot be lesser than min weight'
                }
            })
            return false
        }
        else {
            this.setState({
                ...this.state,
                error: {
                    ...this.state.error,
                    height: ''
                }
            })
            return true
        }
    }
    
// Returns true or false depending on the result of executing all validations
    validations(validations) {
        if ( validations.length !== 0 ) {
            let valReg = [];
            for ( let x=0; x < validations.length; x++ ) {
                valReg.push(validations[x]());
            }
            if ( valReg.filter(reg => reg === false).length > 0 ) return false 
            else return true
        }
    }

    toBreedCte({ name, minHeight, maxHeight, minWeight, maxWeight, maxAge, tempers }) {
        return {
            name: name,
            weight: `${minWeight} - ${maxWeight}`,
            height: `${minHeight} - ${maxHeight}`,
            maxAge: maxAge,
            temper: tempers
        }
    }
    
    create(e) {
        e.preventDefault();
        if ( this.validations([
                this.validateName.bind(this),
                this.validateHeight.bind(this),
                this.validateWeight.bind(this)
            ])
        ) {
            console.log(this.state.breed);
            console.log(this.toBreedCte(this.state.breed));
            this.props.createBreed(this.toBreedCte(this.state.breed));
        }
    }

    render() {
        return(
            <>
                <form onSubmit={ e => this.create(e) }>
                    <div className='input-container'>
                        <label> Breed Name </label>
                        <input 
                            className='text-container'
                            type="text" 
                            name='name' 
                            placeholder=' Breed name'
                            onChange={ e => this.handleChange(e) }
                        />
                    </div>
                    <div className='input-container'>
                        <label> Min. Height </label>
                        <input 
                            className='text-container'
                            type="text" 
                            name='minHeight' 
                            placeholder=' Breed estimated minimum height'
                            onChange={ e => this.handleChange(e) }
                        />
                    </div>
                    <div className='input-container'>
                        <label> Max. Height </label>
                        <input 
                            className='text-container'
                            type="text" 
                            name='maxHeight' 
                            placeholder=' Breed estimated maximum height'
                            onChange={ e => this.handleChange(e) }
                        />
                    </div>
                    <div className='input-container'>
                        <label> Min. Weight </label>
                        <input 
                            className='text-container'
                            type="text" 
                            name='minWeight' 
                            placeholder=' Breed estimated minimum weight'
                            onChange={ e => this.handleChange(e) }
                        />
                    </div>
                    <div className='input-container'>
                        <label> Max. Weight </label>
                        <input 
                            className='text-container'
                            type="text" 
                            name='maxWeight' 
                            placeholder=' Breed estimated maximum weight'
                            onChange={ e => this.handleChange(e) }
                        />
                    </div>
                    <div className='input-container'>
                        <label> Maximum Age </label>
                        <input 
                            className='text-container'
                            type="text" 
                            name='maxAge' 
                            placeholder=' Breed estimated maximum age'
                            onChange={ e => this.handleChange(e) }
                        />
                    </div>
                    <div className='input-container'>
                        <label> Temperaments </label>
                        <input 
                            className='text-container'
                            type="text" 
                            name='tempers' 
                            placeholder=' Common temperaments of this breed (separated by comma)'
                            onChange={ e => this.handleChange(e) }
                        />
                    </div>
                    <input className="submitButton" type="submit" />
                </form>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        createBreed: state => dispatch(createBreed(state))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (CreateBreed)
