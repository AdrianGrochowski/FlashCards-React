import React from 'react';
import ReactDOM from 'react-dom';

class Answer extends React.Component {

  changeInput = (e) => {
    this.props.setAnswer(e.target.value)
  }

render() {
  return (
    <div style={{textAlign:"center"}}>
      <h1>Your answer: {this.props.answer}</h1>
      <input onChange={this.changeInput} type="text" name="text" value={this.props.answer}/>
    </div>
  )
}

}

export default Answer;
