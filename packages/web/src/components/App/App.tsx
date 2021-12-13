import React from 'react';
import CreateServer from '@modules/servers/CreateServer';

import './App.css';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CreateServer />
        <section className="HowToUse">
          <span>Learn </span>
          <a
            className="HowToUser-link"
            href="/docs"
            target="_blank"
            rel="noopener noreferrer">
            How To Use Rana
          </a>
        </section>
      </header>
    </div>
  );
}

export default App;
