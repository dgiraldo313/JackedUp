import React, { Component } from 'react';
import { Link, Router } from 'react-router';

class Logo extends Component {
  constructor(props) {
    super(props);

  }

  getLogo() {
    // assign the correct logo depending on the page
    // Main Logo should only display on Home page

    let route = this.props.route.pathname;

    let logo = route !== '/' ?
               <div className="logo-icon"></div>
               :
               <div className="logo-main"></div>;

    return logo;
  }

  render() {
    return (
      <Link to="/">
        { this.getLogo() }
      </Link>
    );
  }
}

export default Logo;
