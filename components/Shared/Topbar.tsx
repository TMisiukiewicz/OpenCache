import React from 'react';
import {Appbar} from 'react-native-paper';
import {withNavigation, NavigationInjectedProps} from 'react-navigation';
import theme from '../../theme';
import {StyleSheet} from 'react-native';

interface ITopbarInterface extends NavigationInjectedProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
}

function Topbar({
  title,
  subtitle,
  showBackButton,
  navigation,
}: ITopbarInterface): React.ReactElement {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Appbar.Header style={styles.topbar}>
      {showBackButton && <Appbar.BackAction onPress={goBack} />}
      <Appbar.Content title={title} subtitle={subtitle} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  topbar: {
    backgroundColor: theme.primaryColor,
  },
});

export default withNavigation(Topbar);
