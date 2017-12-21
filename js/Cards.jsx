import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  Link,
  IndexLink,
  IndexRoute,
  hashHistory
} from 'react-router';

class Cards extends React.Component {

  componentDidUpdate() {

        $('.cards').tilt({
            glare: true,
            maxGlare: .1
        })

  }

  componentDidMount() {

    this.randomIndex = [];

    fetch('http://localhost:3000/fiszki', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json()).then(data => {
      console.log(data);
      this.setState({data: data})
    });

  }

  state = {
    data: [],
    question: '',
    answer: ''
  }

  counter = 0;

  nextQuestion = () => {

    let div = document.querySelector(".cards");
    let inner = document.querySelector(".inner");
    div.classList.remove("roll");
    inner.classList.remove("fade");

    this.counter++
    console.log(this.counter);
    let search = true;

    if (this.counter === this.state.data.length + 1) {
      alert("You are out of FLASHCARDS, add new ones");
      return
    }

    while (search) {
      this.randomCard = Math.floor(Math.random() * this.state.data.length);

      if (this.randomIndex.indexOf(this.randomCard) === -1) {
        this.randomIndex.push(this.randomCard);
        search = false;
      }
    }

    this.setState({
      question: this.state.data[this.randomCard].question,
      answer: ''
    })

  }

  showAnswer = () => {

  let div = document.querySelector(".cards");
  let inner = document.querySelector(".inner");
  div.classList.add("roll");
  inner.classList.add("fade");

    this.setState({
      answer: this.state.data[this.randomCard].answer,
      question: ''
    })

  }

  render() {

    if (this.state.data.length === 0) {
      return <p style={{textAlign:"center"}}>Loading...</p>
    }

    return (
      <div className="main">
        <div className="cards" data-tilt="data-tilt">
          <div className="inner">
            <p>
              {this.state.question}
            </p>
            <p>
              {this.state.answer}
            </p>
          </div>
        </div>
        <br/>
        <button onClick={this.showAnswer} style={{margin:"5px"}}>Show answer</button>
        <button onClick={this.nextQuestion} style={{margin:"5px"}}>Next question</button>
        <br/>
        <IndexLink to="/">Add new Card!</IndexLink>
    </div>)
  }

}

export default Cards;
