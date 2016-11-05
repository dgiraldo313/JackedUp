import React, { Component } from 'react';

// load views
import Workout from './views/Workout';

//import widgets

class App extends Component {
  constructor(props) {
    super(props);

    // list of states for application
    this.state = {
                  CardsData: {
                    HEARTS: {
                      exercise: 'push ups',
                      reps: 0,
                    },
                    DIAMONDS: {
                      exercise: 'sit ups',
                      reps: 0,
                    },
                    SPADES: {
                      exercise: 'burpes',
                      reps: 0,
                    },
                    CLUBS: {
                      exercise: 'pull ups',
                      reps: 0,
                    },
                  },
                  FinalTime: null,
                  WorkoutCompleted: false,
                };

  }

  // Helper function to facilitate state change from other components
  refreshState(state) {
    this.setState(state);
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
