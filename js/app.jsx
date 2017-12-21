import React from 'react';
import ReactDOM from 'react-dom';

import {Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';


class Create extends React.Component {
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
    <div>
    <Question setQuestion={this.setQuestion} question={this.state.question} />
    <Answer setAnswer={this.setAnswer} answer={this.state.answer} />
    <Button clearForm={this.clearForm} answer={this.state.answer} question={this.state.question} />
  </div>
  )
}
}

class Question extends React.Component {

  changeInput = (e) => {
    this.props.setQuestion(e.target.value)
  }

  render() {
    return (
      <div>
        <h1>Your question: {this.props.question}</h1>
        <input onChange={this.changeInput} type="text" name="text" value={this.props.question} />
      </div>
    )
  }
}


class Answer extends React.Component {

  changeInput = (e) => {
    this.props.setAnswer(e.target.value)
  }

render() {
  return (
    <div>
      <h1>Your answer: {this.props.answer}</h1>
      <input onChange={this.changeInput} type="text" name="text" value={this.props.answer}/>
    </div>
  )
}

}


class Button extends React.Component {
// na klik wysylamy pytania i odpowiedzi na serwer/ tworzymy nowa fiszke
  click = (e) => {

    const obj = {

        "question": this.props.question,
        "answer": this.props.answer

      };

      fetch('http://localhost:3000/fiszki', {
      method : 'POST',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    .then( resp => resp.json())
    .then( data => {
    console.log( data );
    });

    // czyscimy formularze
    this.props.clearForm();

  }

  render() {
    return (
      <div>
        <button onClick={this.click}>Add new Card</button>
      </div>
    )
  }

}


class Cards extends React.Component {

componentDidMount () {

  this.randomIndex = [];

  fetch('http://localhost:3000/fiszki', {
  method : 'GET',
  headers : {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  })
  .then( resp => resp.json())
  .then( data => {
  console.log( data );
  this.setState({
   data: data
  })
  });

}

state = {
  data: [],
  question: '',
  answer: ''
}

counter=0;

nextQuestion = () => {
this.counter++
console.log(this.counter);
let search = true;

if(this.counter === this.state.data.length+1) {
  alert("Wyczerpałeś fiszki, dodaj nowe!");
  return
}

while(search){
  this.randomCard = Math.floor(Math.random() * this.state.data.length);

  if(this.randomIndex.indexOf(this.randomCard) === -1) {
    this.randomIndex.push(this.randomCard);
    search = false;
  }
}

this.setState ({
  question: this.state.data[this.randomCard].question,
  answer: ''
})

}


showAnswer = () => {

this.setState ({
  answer: this.state.data[this.randomCard].answer,
  question: ''
})

}


  render() {

    if(this.state.data.length === 0){
      return <p>Loading...</p>
    }

    return (
    <div>
      <div style={{border:"2px solid black", width:400, height:300, textAlign:"center", lineHeight:"270px", fontSize:"25px"}}>
        <p> {this.state.question} </p>
        <p> {this.state.answer} </p>
      </div>
      <button onClick={this.nextQuestion}>Next question</button>
      <br/>
      <br/>
      <button onClick={this.showAnswer}>Show answer</button>
    </div>
    )
  }

}



class App extends React.Component {
  render() {
    return (

                  <Router history={hashHistory}>
                      <Route path='/' component={Create} />
                      <Route path='/cards' component={Cards} />
                  </Router>
    )
  }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
