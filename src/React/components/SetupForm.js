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
    this.randomizeExercises = this.randomizeExercises.bind(this);
    this.exerciseList = this.props.data;
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

  randomizeExercises() {
    const randomNum = () => {
      let num = Math.floor(Math.random() * this.exerciseList.length);
      return num;
    };

    let randomNums = [];

    // pick the 4 exercises
    let prevNum;
    for (let i = 0; i < 4; i++) {
      let num = randomNum();

      //check to make sure num is not repeated
      while (num === prevNum) {
        num = randomNum();
      }

      prevNum = num;
      randomNums.push(num);
    }

    //assign exercises
    this.props.state.CardsData.HEARTS.exercise = this.exerciseList[randomNums[0]];
    this.props.state.CardsData.CLUBS.exercise = this.exerciseList[randomNums[1]];
    this.props.state.CardsData.DIAMONDS.exercise = this.exerciseList[randomNums[2]];
    this.props.state.CardsData.SPADES.exercise = this.exerciseList[randomNums[3]];

    // refresh state
    this.refresh(this.props.state);

  }

  onSubmit(e) {
    e.preventDefault();

    // check that all fields are filled in
    if (this.props.state.CardsData.HEARTS.exercise === "" ||
        this.props.state.CardsData.CLUBS.exercise === "" ||
        this.props.state.CardsData.DIAMONDS.exercise === "" ||
        this.props.state.CardsData.SPADES.exercise === "") {
          alert("Some fields are empty. Please fill them in!");
          return;
    }

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
        <div className="form-container">
          <form onSubmit={ onSubmit }>
            <div className="form-item">
              <span className="hearts">&hearts;:</span><input type="text"
                                                           value= { heartsExercise }
                                                            name="HEARTS"
                                                        onChange={ onChange }
                                                        placeholder="HEARTS"
                                                        required />
                                                      </div>

          <div className="form-item">
            <span className="clubs">&clubs;:</span><input type="text"
                                                       value= { clubsExercise }
                                                        name="CLUBS"
                                                    onChange={onChange}
                                                    placeholder="CLUBS"
                                                    required />
                                                </div>

            <div className="form-item">
              <span className="diamonds">&diams;:</span><input type="text"
                                                            value= { diamondsExercise }
                                                             name="DIAMONDS"
                                                         onChange={onChange}
                                                         placeholder="DIAMONDS"
                                                         required />
                                                     </div>
            <div className="form-item">
              <span className="spades">&spades;:</span><input type="text"
                                                           value= { spadesExercise }
                                                            name="SPADES"
                                                        onChange={onChange}
                                                        placeholder="SPADES"
                                                        required />
                                                    </div>
          </form>
          <div className="buttons-container">
            <button onClick={ onSubmit }>Let's do it!</button>
            <button className="random" onClick={this.randomizeExercises} >
              <i className="fa fa-random" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

}

export default SetupForm;
