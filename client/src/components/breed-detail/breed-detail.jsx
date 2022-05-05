import './breed-detail.css';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getBreedDetail, clearDetail } from '../../actions';
import loading from '../../imgs/loading.png'



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

    componentWillUnmount() {
        console.log('detail will unmount')
        // Aca poner para que se limpie el estado breedDetail cuando vamos a salir
        this.props.clearDetail();
    }

    render() {
        if ( Object.keys(this.props.breedDetail).length !== 0 ) {
            if ( !this.ext ) {
                if ( !this.props.breedDetail.temper ) {
                    return (
                        <>Loading...</>
                    )
                }
                else {
                    return (
                        <> 
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
                    <div className='breed-detail-container'>
                        <h1 id='breed-title'>{this.props.breedDetail.name}</h1>
                        {!!this.props.breedDetail.imgUrl &&
                            <img 
                                src={this.props.breedDetail.imgUrl} 
                                alt="breed_picture"
                                className='breed-picture'
                            /> 
                        }
                        <br/>
                        <b>Age Range:</b> {this.props.breedDetail.maxAge} <br/> 
                        <b>Height Range:</b> {this.props.breedDetail.height} <br/>
                        <b>Weight Range:</b> {this.props.breedDetail.weight} <br/>
                        <b>Temperament:</b> {this.props.breedDetail.temper} <br/>
                    </div>
                )
            }
        }
        else {
            return (
                <div className='breed-detail-container'>
                    <img src={loading} alt="loading" width="400px" />
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
        getBreedDetail: (breedId, ext) => dispatch(getBreedDetail(breedId, ext)),
        clearDetail: () => dispatch(clearDetail())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BreedDetail) 