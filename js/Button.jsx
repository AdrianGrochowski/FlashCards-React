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

    if (this.props.question != "" || this.props.answer != "") {
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
    } else {
        e.target.style.backgroundColor = "rgb(212, 93, 93)";
        var el = e.target;
      setTimeout(() => {
        el.style.backgroundColor = "";
      }, 500);
    }

  }


  render() {
    return (
      <div style={{textAlign:"center"}}>
        <button className="main_btn" onClick={this.click}>Add new Card</button>
      </div>
    )
  }

}

export default Button;
