import React from 'react';
import CreateServer from '@modules/servers/CreateServer';

import './App.css';
import RanaLogo from './Rana-logo.svg';
import ServersList from '@modules/servers/ServersList';
import Settings from '@modules/settings/Settings';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={RanaLogo} className="App-logo" alt="rana mc logo" />
        <Settings />
        <ServersList />
        <CreateServer />
        <section className="HowToUse">
          <span>Learn </span>
          <a
            className="HowToUser-link"
            href="/docs"
            target="_blank"
            rel="noopener noreferrer">
            How To Use Rana MC
          </a>
        </section>
      </header>
    </div>
  );
}

export default App;
