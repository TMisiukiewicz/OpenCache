import React from 'react';
import {Text} from 'react-native';
import LoginButton from './LoginButton';
import {useDictionary} from 'hooks';

export default function Login() {
  const dictionary = useDictionary();

  return (
    <React.Fragment>
      <LoginButton />
      <Text>{dictionary('redirectInformation')}</Text>
    </React.Fragment>
  );
}
