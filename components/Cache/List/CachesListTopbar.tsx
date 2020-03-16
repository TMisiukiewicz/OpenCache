import React from 'react';
import {Appbar} from 'react-native-paper';
import {withNavigation, NavigationInjectedProps} from 'react-navigation';
import {StyleSheet} from 'react-native';
import theme from '../../../theme';

interface CachesListTopbarProps extends NavigationInjectedProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean | undefined;
}

function CachesListTopbar({
  title,
  subtitle,
  showBackButton,
  navigation,
}: CachesListTopbarProps) {
  const goBack = (): void => {
    navigation.goBack();
  };

  return (
    <Appbar.Header style={styles.container}>
      {showBackButton && <Appbar.BackAction onPress={goBack} />}
      <Appbar.Content title={title} subtitle={subtitle} />
      <Appbar.Action icon="magnify" onPress={() => console.log('hi')} />
      <Appbar.Action icon="dots-vertical" onPress={() => console.log('menu')} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primaryColor,
  },
});

export default withNavigation(CachesListTopbar);
