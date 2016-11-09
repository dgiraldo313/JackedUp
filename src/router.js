// import react
import React from 'react';

// import react router modules
import { Router, Route, hashHistory } from 'react-router';

// import components for the different pages
import App from './React/App';
import Setup from './React/views/Setup';
import Workout from './React/views/Workout';
import Results from './React/views/Results';

//import data
import Exercises from './data/exercises.js';

//Routes
const routes = (
  <Router history={ hashHistory }>
    <Route  component={ App }>
      <Route path="/" component={ Setup } data= {Exercises}/>
      <Route path="working" component={ Workout }/>
      <Route path="results" component={ Results } />
    </Route>
  </Router>
);

export default routes;
