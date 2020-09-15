import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './Join';
import Chat from './Chat';

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />

      </Router>
    </div>
  );
}

export default App;
