import React from 'react';
import ReactDOM from 'react-dom';
import {Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';

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
        <br/>
        <IndexLink to="/cards">Let's learn!</IndexLink>
      </div>
    )
  }

}

export default Button;
