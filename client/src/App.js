import './App.css';
import React from 'react';
import Login from './components/login/login';
import Home from './components/home/home'
import { Route } from 'react-router-dom';

function App() {
  return (
    // <div className="App">
    //   <h1>Henry Dogs</h1>
    // </div>
    <React.Fragment>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />
      {/* <Route path="/favs" component={Favorites} />
      <Route path="/movie/:id" component={Movie} /> */}
    </React.Fragment>
  );
}

export default App;
