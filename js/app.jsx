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
import Game from './Game.jsx';


class Template extends React.Component {
    render() {
      const style = {
        color: "rgb(241, 180, 33)",
        borderBottom: "1px solid black"
      };
        return (
            <div>
              <div className="menu">
                <h1 style={{margin:"40px"}}>FLASH<span>CARDS</span></h1>
                <ul className="routerMenu">
                    <li><IndexLink to="/" activeStyle={ style } className="indexLink">NEW CARDS</IndexLink></li>
                    <li><IndexLink to="/cards" activeStyle={ style } className="indexLink">FLASHCARDS</IndexLink></li>
                    <li><IndexLink to="/list" activeStyle={ style } className="indexLink">EDIT</IndexLink></li>
                    <li><IndexLink to="/game" activeStyle={ style } className="indexLink">PLAY</IndexLink></li>
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
            <Route path='/game' component={Game} />
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
