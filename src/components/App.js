import React, { Component } from 'react';

// load components
import Workout from './pages/Workout';

//import widgets

class App extends Component {
  constructor(props) {
    super(props);

    // list of states for application
    this.state = {
                  HEARTS: {
                    exercise: null,
                    reps: null,
                  },
                  DIAMOND: {
                    exercise: null,
                    reps: null,
                  },
                  SPADES: {
                    exercise: null,
                    reps: null,
                  },
                  CLUBS: {
                    exercise: null,
                    reps: null,
                  },
                  FinalTime: null,
                  WorkoutFinished: false,
                };

  }

  // Helper function to facilitate state change from other components
  refreshState(state) {
    this.setState({
            state,
          });
  }

  render() {
    // export function to refresh state
    const refresh = function (state) {
                              this.refreshState(state);
                            }.bind(this);
    return (
      <div id="app">
        <div className="main-container">
          <div className="logo-container">
            <div className="logo">JackedUp</div>
          </div>
          <div className="dynamic-content">
            {React.cloneElement(this.props.children, { state: this.state,
                                                      refresh: refresh, })}
          </div>
        </div>
      </div>
    );
  }

}

export default App;
;
