import './breed-detail.css';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getBreedDetail } from '../../actions';


export class BreedDetail extends Component {    
    constructor(props) {
        super(props);
        this.breedId = this.props.match.params.id;
    }

    componentDidMount() {
        this.props.getBreedDetail(this.breedId);
        console.log('componentDidMount:');
        console.log(this.props.breedDetail);
    }

    componentDidUpdate() {
        console.log('componentDidUpdate:');
        console.log(this.props.breedDetail);
    }

    render() {
        if ( !this.props.breedDetail.temper ) {
            return (
                <>Loading...</>
            )
        }
        else {
            return (
                <> 
                    Welcome to BreedDetail! {this.breedId} <br/>
                    {this.props.breedDetail.name} <br/>
                    {this.props.breedDetail.temper.join(' ')} <br/>
                    {this.props.breedDetail.height} <br/>
                    {this.props.breedDetail.weight} <br/>
                    {this.props.breedDetail.maxAge} <br/> 
                </>
            )
        }
    }

}

function mapStateToProps(state) {
    return {
        breedDetail: state.breedDetail
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getBreedDetail: breedId => dispatch(getBreedDetail(breedId))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BreedDetail) 