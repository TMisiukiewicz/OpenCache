import React, {useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Text} from 'react-native-paper';
import CachesList from './CachesList';
import {useDictionary} from 'hooks';
import {Dimensions, StyleSheet} from 'react-native';
import theme from '../../../theme';

export default function ListTabs() {
  const dictionary = useDictionary();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'nearby', title: dictionary('nearby')},
    {key: 'saved', title: dictionary('saved')},
  ]);

  const Nearby = () => <CachesList />;
  const Saved = () => <Text>Hello</Text>;

  const renderScene = SceneMap({
    nearby: Nearby,
    saved: Saved,
  });

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: Dimensions.get('window').width}}
      renderTabBar={props => (
        <TabBar
          style={styles.tabBar}
          indicatorStyle={styles.indicator}
          {...props}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.secondaryColor,
  },
  indicator: {
    backgroundColor: 'white',
  },
});
