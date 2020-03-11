import React from 'react';
import {ScreenWrapper, Topbar} from 'components/Shared';
import Login from 'components/User/Login';

export default function UserScreen() {
  return (
    <React.Fragment>
      <Topbar title={'Logowanie'} />
      <ScreenWrapper>
        <Login />
      </ScreenWrapper>
    </React.Fragment>
  );
}
