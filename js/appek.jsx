import React from 'react';
import ReactDOM from 'react-dom';
import {Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';

import Main from './Main.jsx';
import Cards from './Cards.jsx';
import List from './List.jsx';

class Template extends React.Component {
    render() {
      const style = {
        backgroundColor: "lightgreen"
      };
        return (
            <div>
              <div className="menu">
                <h1>FLASHCARDS</h1>
                <ul>
                    <li><IndexLink to="/" activeStyle={ style }>ADD NEW CARDS</IndexLink></li>
                    <li><IndexLink to="/cards" activeStyle={ style }>FLASHCARDS</IndexLink></li>
                    <li><IndexLink to="/list" activeStyle={ style }>EDIT</IndexLink></li>
                </ul>
              </div>
                {this.props.children}
            </div>
        )
    }
}


class App extends React.Component {
  render() {
    return (
    <Router history={hashHistory}>
      <Route path='/' component={Template}>
            <IndexRoute component={Main} />
            <Route path='/cards' component={Cards} />
            <Route path='/list' component={List} />
      </Route>
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
