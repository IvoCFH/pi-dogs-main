import './login.css';
import { Component } from "react";
import { Link } from 'react-router-dom';
import login_1 from '../../imgs/login/login_1.jpg';


export default class Login extends Component {
    render() {
        return (
            <>
                <div className='login-container'>
                </div>
                <img src={login_1} className="background-img" alt="login_1" />
                <Link to={`/home`}>
                    <div className='banner'>
                        <h1>INGRESAR</h1>
                    </div>
                </Link>
            </>
        )
    }
}


