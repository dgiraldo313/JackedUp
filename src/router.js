// import react
import React from 'react';

// import react router modules
import { Router, Route, hashHistory } from 'react-router';

// import components for the different pages
import App from './components/App';
import Welcome from './components/pages/Welcome';
import Workout from './components/pages/Workout';

// import content
// import Content from './data/Content';
console.log(App.props);

//Routes
const routes = (
  <Router history={ hashHistory }>
    <Route  component={ App }>
      <Route path="/" component={ Welcome } />
      <Route path="working" component={ Workout } />
    </Route>
  </Router>
);

export default routes;
