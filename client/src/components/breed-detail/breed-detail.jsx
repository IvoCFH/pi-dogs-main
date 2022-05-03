import './breed-detail.css';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getBreedDetail } from '../../actions';



export class BreedDetail extends Component {    
    constructor(props) {
        super(props);
        this.breedId = this.props.match.params.id;
        this.ext = new URLSearchParams(this.props.location.search).get('ext');
    }

    componentDidMount() {
        console.log(this.ext)
        this.props.getBreedDetail(this.breedId, this.ext);
        console.log('componentDidMount:');
        console.log(this.props.breedDetail);
    }

    componentDidUpdate() {
        console.log('componentDidUpdate:');
        console.log(this.props.breedDetail);
    }

    render() {
        if ( !this.ext ) {
            if ( !this.props.breedDetail.temper ) {
                return (
                    <>Loading...</>
                )
            }
            else {
                return (
                    <> 
                        Welcome to BreedDetail! <br/>
                        {this.breedId} <br/>
                        {this.props.breedDetail.name} <br/>
                        {this.props.breedDetail.temper.join(' ')} <br/>
                        {this.props.breedDetail.height} <br/>
                        {this.props.breedDetail.weight} <br/>
                        {this.props.breedDetail.maxAge} <br/> 
                    </>
                )
            }
        }
        else {
            return (
                <div align="center"> 
                    Welcome to BreedDetail! <br/><br/>
                    {!!this.props.breedDetail.imgUrl &&
                        <>
                            <img 
                                src={this.props.breedDetail.imgUrl} 
                                width="400px" 
                                alt="breed_picture"
                            /> 
                            <br/>
                        </>
                    }
                    {this.breedId} <br/>
                    {this.props.breedDetail.name} <br/>
                    {this.props.breedDetail.temper} <br/>
                    {this.props.breedDetail.height} <br/>
                    {this.props.breedDetail.weight} <br/>
                    {this.props.breedDetail.maxAge} <br/> 
                </div>
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
        getBreedDetail: (breedId, ext) => dispatch(getBreedDetail(breedId, ext))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BreedDetail) 