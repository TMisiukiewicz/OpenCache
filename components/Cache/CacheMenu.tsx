import * as React from 'react';
import {StyleSheet} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import CacheDetails from './CacheDetails';
import CacheLogs from './CacheLogs';
import CacheImages from './CacheImages';
import CacheDescription from './CacheDescription';
import theme from '../../theme';
import {dictionary} from '../../dictionary';
import {useSelector} from 'react-redux';
import {generalSelectors} from 'store/reducers/general';

const DetailsScreen = () => <CacheDetails />;
const LogsScreen = () => <CacheLogs />;
const ImagesScreen = () => <CacheImages />;
const DescriptionScreen = () => <CacheDescription />;

export default function CacheMenu() {
  const lang = useSelector(generalSelectors.getLang);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'details',
      title: dictionary.details[lang],
      icon: 'information-outline',
    },
    {
      key: 'description',
      title: dictionary.description[lang],
      icon: 'script-text-outline',
    },
    {
      key: 'logs',
      title: dictionary.logs[lang],
      icon: 'comment-text-multiple-outline',
    },
    {
      key: 'images',
      title: dictionary.photos[lang],
      icon: 'image',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    details: DetailsScreen,
    logs: LogsScreen,
    images: ImagesScreen,
    description: DescriptionScreen,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      barStyle={styles.navigation}
      shifting
    />
  );
}

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: theme.primaryColor,
  },
});
