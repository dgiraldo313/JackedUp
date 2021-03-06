import React, { Component } from 'react';

//import components
import Logo from './components/Logo';

class App extends Component {
  constructor(props) {
    super(props);

    // list of states for application
    this.state = {
                  CardsData: {
                    HEARTS: {
                      exercise: '',
                      reps: 0,
                    },
                    DIAMONDS: {
                      exercise: '',
                      reps: 0,
                    },
                    SPADES: {
                      exercise: '',
                      reps: 0,
                    },
                    CLUBS: {
                      exercise: '',
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
          <Logo route= {this.props.location }/>
          <div className="dynamic-content">
            {React.cloneElement(this.props.children, { state: this.state,
                                                      refresh: refresh, })}
          </div>
        </div>
        <div className="signature-container">
          <a href="http://www.danielgiraldo.com" target="_blacnk">
            <i className="fa fa-user" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    );
  }

}

export default App;
;
