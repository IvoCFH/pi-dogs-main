import './filters.css';
import { Component } from 'react';
import { connect } from 'react-redux';

export class Filters extends Component {
    render() {
        return (
            <div className='filtersContainer'>
                asd
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {}
};

function mapDispatchToProps(daspatch) {
    return {}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters) 
