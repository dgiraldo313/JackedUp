import React, { Component } from 'react';
import { Router } from 'react-router';

class SetupForm extends Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.refresh = this.props.refresh;
  }

  componentWillMount() {
    // this.render();
  }

  updateExercise(e) {
    let suit = e.target.name;

    // add exercise name to each indivdual exercise
    let stateSuit;

    if (suit === 'HEARTS') {
      stateSuit = this.props.state.CardsData.HEARTS;
    } else if (suit === 'DIAMONDS') {
      stateSuit = this.props.state.CardsData.DIAMONDS;
    } else if (suit === 'CLUBS') {
      stateSuit = this.props.state.CardsData.CLUBS;
    } else if (suit === 'SPADES') {
      stateSuit = this.props.state.CardsData.SPADES;
    }

    // increment current rep count
    stateSuit.exercise = e.target.value;

    // refresh app state
    this.refresh(this.props.state);
  }

  onSubmit(e) {
    e.preventDefault();

    //send user to workout page
    this.context.router.push('/working');
  }

  render() {
    // assign exercise names
    let heartsExercise = this.props.state.CardsData.HEARTS.exercise;
    let spadesExercise = this.props.state.CardsData.SPADES.exercise;
    let diamondsExercise = this.props.state.CardsData.DIAMONDS.exercise;
    let clubsExercise = this.props.state.CardsData.CLUBS.exercise;

    // update function
    let onChange = function (e) {
                    this.updateExercise(e);
                  }.bind(this);
    let onSubmit = function (e) {
                    this.onSubmit(e);
                  }.bind(this);
    return (
      <div className="setup-form">
        <div className="title">Set up Workout:</div>
        <div className="form-container">
          <form onSubmit={ onSubmit }>
            <span className="hearts">&hearts;:</span><input type="text"
                                                           value= { heartsExercise }
                                                            name="HEARTS"
                                                        onChange={ onChange }
                                                        required />

            <span className="spades">&spades;:</span><input type="text"
                                                           value= { spadesExercise }
                                                            name="SPADES"
                                                        onChange={onChange}
                                                        required />

            <span className="diamonds">&diams;:</span><input type="text"
                                                            value= { diamondsExercise }
                                                             name="DIAMONDS"
                                                         onChange={onChange}
                                                         required />
            <span className="clubs">&clubs;:</span><input type="text"
                                                         value= { clubsExercise }
                                                          name="CLUBS"
                                                      onChange={onChange}
                                                      required />
                                                    <button onClick={onSubmit} >Start</button>
          </form>
        </div>

      </div>
    );
  }

}

export default SetupForm;
