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
          <Route exact path='/'> <Home/> </Route>
          <Route exact path='/questions/:id'> <QuestionScreen/> </Route>
        </Switch>
      </BrowserRouter>
    )
  }

}


export default App;
