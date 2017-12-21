import React from 'react';
import ReactDOM from 'react-dom';

class Question extends React.Component {

  changeInput = (e) => {
    this.props.setQuestion(e.target.value)
  }

  render() {
    return (
      <div style={{textAlign:"center"}}>
        <h1>Your question: {this.props.question}</h1>
        <input onChange={this.changeInput} type="text" name="text" value={this.props.question}/>
      </div>
    )
  }
}

export default Question;
