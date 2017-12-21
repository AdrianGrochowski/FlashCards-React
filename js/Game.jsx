import React from 'react';
import ReactDOM from 'react-dom';

class Game extends React.Component {

  loadData() {
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

  componentDidMount() {
    this.loadData();
  }

  state = {
    data: []
  }

clickQuestion = (e) => {
    this.question = e.target.dataset.id
    console.log(this.question, this.answer);
    if(this.answer === this.question) {
      alert ('Super')
      this.question = 0
      this.answer = 0
      const el = document.querySelectorAll('[data-id="'+e.target.dataset.id+'"]');
      el.forEach((e,i) => {
        e.style.backgroundColor = "lightgreen"
      })
    } else if (this.question>0 && this.answer>0) {
      this.question = 0
      this.answer = 0
    }
}

clickAnswer = (e) => {
    this.answer = e.target.dataset.id
    console.log(this.question, this.answer);
    if(this.answer === this.question) {
      this.question = 0
      this.answer = 0
      const el = document.querySelectorAll('[data-id="'+e.target.dataset.id+'"]');
      console.log(el);
      el.forEach((e,i) => {
        e.style.backgroundColor = "lightgreen"
      })
    } else if (this.question>0 && this.answer>0) {
      this.question = 0
      this.answer = 0
    }
}



  render() {

    let randomIndex = [];

    const rows = this.state.data.map((e, i) => {

      let search = true;
      let rand1 = 0;

      while (search) {
        rand1 = Math.floor((Math.random() * this.state.data.length));

        if (randomIndex.indexOf(rand1) === -1) {
          randomIndex.push(rand1);
          search = false;
        }
      }


      return (<tr key={i}>
        <td onClick={this.clickQuestion} data-id={this.state.data[rand1].id}> {this.state.data[rand1].question} </td>
        <td onClick={this.clickAnswer} data-id={this.state.data[i].id}> {e.answer} </td>
      </tr>)
    })

    return (<div className={"main"}>
      <table>
        <thead>
          <tr>
            <td>Question</td>
            <td>Answer</td>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>)
  }
}


export default Game;
