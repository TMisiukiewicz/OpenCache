import React, {useEffect} from 'react';
import {View, Linking} from 'react-native';
import {Loader} from 'components/Shared';

export default function AfterLogin() {
  useEffect(() => {
    Linking.getInitialURL()
      .then(ev => {
        if (ev) {
          handleOpenURL(ev);
        }
      })
      .catch(err => {
        console.warn('An error occurred', err);
      });
    Linking.addEventListener('url', handleOpenURL);
  }, []);

  const handleOpenURL = (event: any) => {
    console.log(event.url);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Loader />
    </View>
  );
}
