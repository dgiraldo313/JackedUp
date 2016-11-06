import React, { Component } from 'react';

// creates dynamic button with different names depending on state of workout

class ControlButton extends Component {
  constructor(props) {
    super(props);
  }

  message() {
    console.log(this.props.state);
    let message;
    if (this.props.state === 'INITIAL') {
      message = 'start';
    }else if (this.props.finish) {
      // add finish button right before workout ends
      message = 'finish';
    }else if (this.props.state === 'INPROGRESS') {
      message = 'next';
    }else if (this.props.state === 'STOPPED') {
      message = 'continue';
    }

    return message;
  }

  render() {
    return (
      <button onClick={ this.props.nextCard }>{ this.message() }</button>
    );
  }

}

export default ControlButton;
