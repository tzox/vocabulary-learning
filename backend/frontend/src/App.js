import './App.css';
import React, { Component } from "react";
import {BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './screens/Home';
import QuestionScreen from './screens/QuestionScreen';


class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/check/' component={QuestionScreen} />
        </Switch>
      </BrowserRouter>
    )
  }

}


export default App;
