// Libs
import React from 'react';
import { render } from 'react-dom';

// CSS
import './scss/styles.scss';

// get routes - will load the approapiate components
import App from './React/App';

import routes from './router';

// Render
render((
  routes
),
  document.getElementById('root')
);
