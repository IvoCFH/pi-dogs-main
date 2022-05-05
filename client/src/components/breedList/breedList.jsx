import './breedList.css';
import { Component } from 'react';
import { connect } from 'react-redux';
import { BreedCard } from '../breed/breed';
// import { getBreedDetail } from '../../actions';
import loading from '../../imgs/loading.png';
import { getAllBreeds } from '../../actions';

export class BreedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0
        }
    }

    changePage(e) {
        console.log(e.target.name)
        if (e.target.name === 'next' && (this.state.page * 8) + 8 <= this.props.filteredBreeds.length) {
            this.setState({
                ...this.state,
                page: this.state.page + 1
            })
        }
        else if (e.target.name === 'prev' && this.state.page !== 0) {
            this.setState({
                ...this.state,
                page: this.state.page - 1
            })
        }
    };

    orderView(arr) {
        console.log('ordered view')
        if (arr.length > 8) {
            console.log(this.state.page);
            return arr.slice(this.state.page * 8, (this.state.page * 8) + 8)
        }
        else return arr
    }

    componentDidMount() {
        this.props.getAllBreeds();
    }

    componentDidUpdate(prevProps) {
        if ( prevProps.filteredBreeds.length !== this.props.filteredBreeds.length ) {
            this.setState({
                ...this.state,
                page: 0
            })
        }
    }

    render() {
        if (this.props.filteredBreeds.length !== 0) {
            let orderedView = this.orderView(this.props.filteredBreeds)
            return (
                <div className='listContainer'>
                    { this.props.filteredBreeds.length > 8 &&
                        <div className='pages'>
                            <button 
                                name='prev'
                                onClick={ e => this.changePage(e) }
                            >
                                Previous
                            </button>
                            {this.state.page + 1}
                            <button 
                                name='next'
                                onClick={ e => this.changePage(e) }
                            >
                                Next
                            </button>
                        </div>
                    }
                    {orderedView.map( breed => {
                        let temper = breed.temper.join(', ');
                        return (
                            <BreedCard 
                                key = { breed.id }
                                id = { breed.id }
                                breed = { breed.name }
                                weight = { breed.weight }
                                temper = { temper }
                                ext = { breed.external }
                                imgUrl = { breed.imgUrl }
                            />
                        )
                    })}
                </div>
            )
        }
        else {
            return (
                <div className='listContainer'>
                    <div className='noBreedsLoaded'>                        
                        <img src={loading} alt="loading" width="400px" />
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        filteredBreeds: state.filteredBreeds
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getAllBreeds: () => dispatch(getAllBreeds())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BreedList) 
