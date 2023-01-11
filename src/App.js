import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Game, Settings } from './pages';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}

export default App;