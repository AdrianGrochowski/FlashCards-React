import React from 'react';
import ReactDOM from 'react-dom';

import Question from './Question.jsx';
import Answer from './Answer.jsx';
import Button from './Button.jsx';


class Main extends React.Component {
  state = {
    question: "",
    answer: ""
  }

setQuestion = (question) => {
  this.setState({
    question: question
  })
}

setAnswer = (answer) => {
  this.setState({
    answer: answer
  })
}

clearForm = () => {
  this.setState({
    question: "",
    answer: ""
  })
}


render() {
  return (
    <div className="main">
      <div className="home">
        <Question setQuestion={this.setQuestion} question={this.state.question}/>
        <Answer setAnswer={this.setAnswer} answer={this.state.answer}/>
        <Button clearForm={this.clearForm} answer={this.state.answer} question={this.state.question} />
      </div>
    </div>
  )
}
}

export default Main;
