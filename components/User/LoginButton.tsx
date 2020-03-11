import React, {useEffect} from 'react';
import {Linking} from 'react-native';
import {Button, Theme, withTheme} from 'react-native-paper';
import {useDictionary} from 'hooks';
import {api, makeLevelTwoRequest, makeRequest} from 'util/api';

interface ILoginButtonProps {
  theme: Theme;
}

function LoginButton({theme}: ILoginButtonProps) {
  const dictionary = useDictionary();

  useEffect(() => {
    Linking.getInitialURL()
      .then(url => {
        console.log(url);
        if (url) {
          console.log('Initial url is: ' + url);
        } else {
          console.log('nie ma urla');
        }
      })
      .catch(err => console.error('An error occurred', err));
  }, []);

  const requestToken = async () => {
    const getToken = await makeLevelTwoRequest(
      api.oauth.requestToken({oauth_callback: api.oauth.callbackScreen}),
    );

    if (getToken) {
      const authorizeUrl = `${api.oauth.authorizeToken()}&${getToken.body}`;
      console.log(authorizeUrl);
      //   const supported = await Linking.canOpenURL(authorizeUrl);

      //   if (supported) {
      //     Linking.openURL(authorizeUrl);
      //   } else {
      //     console.error(`${authorizeUrl} is not correct.`);
      //   }
    }
  };

  return (
    <Button
      mode="contained"
      style={{backgroundColor: theme.colors.accent}}
      onPress={requestToken}>
      {dictionary('logIn')}
    </Button>
  );
}

export default withTheme(LoginButton);
