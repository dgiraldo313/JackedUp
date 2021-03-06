import React, { Component } from 'react';

import SetupForm from '../components/SetupForm';

class Setup extends Component {
  constructor(props) {
    super(props);

    // function used to refresh state of app
    this.refresh = this.props.refresh;

  }

  //function helper to refresh state
  // function is passed to children for state manipulation
  refreshState(state) {
    this.refresh(state);
  }

  render() {
    return (
      <div id="setup">
        <SetupForm refresh= { function (state) { this.refreshState(state); }.bind(this) }
                   state= { this.props.state }
                   data= { this.props.route.data }/>
                 <a className="info"
                    href="https://www.verywell.com/how-to-use-playing-cards-to-create-a-workout-routine-85990"
                    target="_blank">How does it work? </a>
     </div>
    );
  }

}

export default Setup;
