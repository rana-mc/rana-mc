import React, { useEffect } from 'react';
import CreateServer from '@modules/servers/ServerCreate';
import ServersList from '@modules/servers/ServersList';
import Settings from '@modules/settings/Settings';
import { startListenSocket } from '@modules/server/serverSlice';
import { useAppDispatch } from '../../app/hooks';
import FloatBottom from '@ui/FloatBottom';
import Main from '@ui/Main';
import { Sidebar } from '@ui/Sidebar';
import Layout from '@ui/Layout';
import AppContainer from '@ui/AppContainer';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startListenSocket());
  }, [dispatch]);

  return (
    <AppContainer>
      <Layout>
        <Sidebar />
        <Main>
          <Settings />
          <ServersList />
          <CreateServer />
        </Main>
      </Layout>
      <FloatBottom />
    </AppContainer>
  );
};

export default App;
