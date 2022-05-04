import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Welcome from './components/welcome/welcome';
import Home from './components/home/home'
import BreedDetail from './components/breed-detail/breed-detail';
import CreateBreed from './components/createBreed/createBreed';
import NavBar from './components/nav-bar/nav-bar';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Route path="/breeds/:id" component={ BreedDetail }/>
      <Route exact path="/breeds" component={Home} />
      <Route exact path="/create-breed" component={ CreateBreed }/>
      <Route exact path="/" component={ Welcome } />
    </React.Fragment>
  );
}

export default App;
