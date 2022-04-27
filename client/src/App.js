import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/login/login';
import Home from './components/home/home'
import BreedDetail from './components/breed-detail/breed-detail';
import CreateBreed from './components/createBreed/createBreed';

function App() {
  return (
    <React.Fragment>
      <Route path="/breeds/:id" component={ BreedDetail }/>
      <Route exact path="/breeds" component={ Home } />
      <Route exact path="/create-breed" component={ CreateBreed }/>
      <Route exact path="/" component={ Login } />
    </React.Fragment>
  );
}

export default App;
