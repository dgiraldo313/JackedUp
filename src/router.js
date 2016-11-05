// import react
import React from 'react';

// import react router modules
import { Router, Route, hashHistory } from 'react-router';

// import components for the different pages
import App from './React/App';
import Welcome from './React/views/Welcome';
import Workout from './React/views/Workout';
import Results from './React/views/Results';

//Routes
const routes = (
  <Router history={ hashHistory }>
    <Route  component={ App }>
      <Route path="/" component={ Welcome } />
      <Route path="working" component={ Workout } />
      <Route path="results" component={ Results } />
    </Route>
  </Router>
);

export default routes;
