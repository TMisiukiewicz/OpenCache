import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Provider} from 'react-redux';
import {store} from 'store';
import {MapScreen} from 'components';
import {config} from 'util';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createAppContainer} from 'react-navigation';
import theme from './theme';
import {dictionary} from './dictionary';
import {IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const lang = store.getState().general.lang;

const styles = StyleSheet.create({
  icon: {
    margin: 0,
    marginTop: -5,
    padding: 0,
  },
});

const BottomNavigation = createMaterialBottomTabNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: {
        title: dictionary.map[lang],
        tabBarIcon: (
          <IconButton icon="map" color="white" size={24} style={styles.icon} />
        ),
      },
    },
    Caches: {
      screen: MapScreen,
      navigationOptions: {
        title: dictionary.caches[lang],
        tabBarIcon: (
          <IconButton
            icon="inbox"
            color="white"
            size={24}
            style={styles.icon}
          />
        ),
      },
    },
    User: {
      screen: MapScreen,
      navigationOptions: {
        title: dictionary.account[lang],
        tabBarIcon: (
          <IconButton
            icon="account"
            color="white"
            size={24}
            style={styles.icon}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Map',
    barStyle: {backgroundColor: theme.primaryColor},
    inactiveColor: '#60a3bc',
    shifting: true,
  },
);

const AppContainer = createAppContainer(BottomNavigation);

const App = () => {
  MapboxGL.setAccessToken(config.mapToken);

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
