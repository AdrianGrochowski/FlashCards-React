import React from 'react';
import ReactDOM from 'react-dom';



class List extends React.Component {

loadData () {
  fetch('http://localhost:3000/fiszki', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(resp => resp.json()).then(data => {
    console.log(data);
    this.setState({
      data: data
    })
  });
}

  componentDidMount() {

    this.loadData();
  }

  state = {
    data: [],
    question: '',
    answer: ''
  }

delete = (e) => {
  let id = e.target.dataset.id;

  fetch('http://localhost:3000/fiszki/' + id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(resp => resp.json()).then(data => {
    console.log(data);
    this.loadData();
  });

}



render() {

const rows = this.state.data.map((e,i) => {
  return (
    <tr key={i}>
      <td>{e.question}</td>
      <td>{e.answer}</td>
      <td><button onClick={this.delete} data-id={e.id}>Usuń</button></td>
    </tr>
  )
})

  return (
    <div className={"main"}>
      <table>
        <thead>
          <tr>
            <td>Question</td>
            <td>Answer</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
        { rows }
        </tbody>
      </table>
    </div>
  )
}
}

export default List;
