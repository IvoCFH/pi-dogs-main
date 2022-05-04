import './welcome.css';
import { Component } from "react";
import { Link } from 'react-router-dom';
import login_1 from '../../imgs/login_1.jpg';
import login_2 from '../../imgs/login_2.jpg';


export default class Welcome extends Component {
    
    render() {
        return (
            <img src={login_2} className="background-img" alt="login_1" />
        )
    }
}


