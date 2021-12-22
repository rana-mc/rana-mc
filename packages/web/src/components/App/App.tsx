import React, { useEffect } from 'react';
import CreateServer from '@modules/servers/ServerCreate';

import './App.css';
import ServersList from '@modules/servers/ServersList';
import Settings from '@modules/settings/Settings';
import { startListenSocket } from '@modules/server/serverSlice';
import RanaLogo from './Rana-logo.svg';
import { useAppDispatch } from '../../app/hooks';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startListenSocket());
  }, [dispatch]);

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
};

export default App;
