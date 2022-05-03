import './createBreed.css';
import React, { Component } from 'react';
import { createBreed } from '../../actions';
import { connect } from 'react-redux';
import { validateFormInputs } from './form-validations';
import { Redirect } from 'react-router-dom';

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
            error: {
                name: ''
            },
            created: false
        }
    }

    async handleChange( event ) {
        if (this.state.error.hasOwnProperty( event.target.name )) await this.setState({
            ...this.state,
            error: {
                ...this.state.error, 
                [event.target.name]: ''
            }
        })
        if ( event.target.name === 'tempers' ) {
            let newTempers = event.target.value.split(',').map( temper => {
                return temper.trim()
            });
            if ( newTempers[newTempers.length - 1] === '' ) {
                newTempers.reverse().shift();
                newTempers.reverse();
            } // remueve el último elemento que queda vacio en el array por culpa del split
            this.setState({
                ...this.state,
                breed: {
                    ...this.state.breed,
                    [event.target.name]: newTempers
                }
            })    
        } // agrega de manera correcta los tempers ingresados, separados por coma
        else {
            this.setState({
                ...this.state,
                breed: {
                    ...this.state.breed,
                    [event.target.name]: event.target.value
                }
            })
        } // agrega la propiedad que estamos ingresando por el form
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
    
    async create(e) {
        e.preventDefault();       
        let valError = validateFormInputs(this.state.breed, [
            { param1: 'name', param2: 3, val: [ 'min-length' ]},
            { param1: 'minHeight', val: [ 'empty' ]},
            { param1: 'minWeight', val: [ 'empty' ]},
            { param1: 'maxHeight', param2: 'minHeight', val: [ 'empty', 'higher' ]},
            { param1: 'maxWeight', param2: 'minWeight', val: [ 'empty', 'higher' ]},
            { param1: 'maxAge', val: [ 'empty' ]},
            { param1: 'tempers', val: [ 'empty' ]}
        ]);
        let invalid = false;
        for ( let error in valError ) {
            if (valError[error] !== '') {
                invalid = true;
                break
            }
        }
        if (!invalid) {
            await this.props.createBreed(this.toBreedCte(this.state.breed))
            this.setState({
                ...this.state,
                created: true
            })
        }
        else {
            console.log('invalid Inputs')
            this.setState({
                ...this.state,
                error: valError
            })
        }
    }

    render() {
        return(
            <>
                { this.state.created && <Redirect to="/breeds"/>}
                <form onSubmit={ e => this.create(e) }>
                    <div className='container'>
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
                        {this.state.error.name && <p className="danger">{this.state.error.name}</p>}
                    </div>
                    <div className='container'>
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
                        {this.state.error.minHeight && <p className="danger">{this.state.error.minHeight}</p>}
                    </div>
                    <div className='container'>
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
                        {this.state.error.maxHeight && <p className="danger">{this.state.error.maxHeight}</p>}
                    </div>
                    <div className='container'>
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
                        {this.state.error.minWeight && <p className="danger">{this.state.error.minWeight}</p>}
                    </div>
                    <div className='container'>
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
                        {this.state.error.maxWeight && <p className="danger">{this.state.error.maxWeight}</p>}
                    </div>
                    <div className='container'>
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
                        {this.state.error.maxAge && <p className="danger">{this.state.error.maxAge}</p>}
                    </div>
                    <div className='container'>
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
                        {this.state.error.tempers && <p className="danger">{this.state.error.tempers}</p>}
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
