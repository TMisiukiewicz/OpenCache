import React, {memo} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {Cache} from 'store/reducers/caches';
import BottomSheet from 'reanimated-bottom-sheet';
import {Button} from 'react-native-paper';
import {withNavigation, NavigationInjectedProps} from 'react-navigation';
import theme from '../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {generalSelectors} from 'store/reducers/general';
import {setSelectedCacheId} from 'store/actions/caches';
import {dictionary} from '../../dictionary';

export interface CacheSheetProps extends NavigationInjectedProps {
  cache: Cache;
}

function CacheSheet({cache, navigation}: CacheSheetProps) {
  const dispatch = useDispatch();
  const lang = useSelector(generalSelectors.getLang);

  const renderContent = () => (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{cache.name}</Text>
      <Text style={styles.panelSubtitle}>
        {`${dictionary.owner[lang]}: ${cache.owner.username}`}
      </Text>
      <View style={styles.data}>
        <Text>{`${dictionary.cacheType[lang]}: ${
          dictionary[cache.type][lang]
        }`}</Text>
        <Text>{`${dictionary.difficulty[lang]}: ${cache.difficulty}`}</Text>
        <Text>{`${dictionary.terrain[lang]}: ${cache.terrain}`}</Text>
        <Text>
          {`${dictionary.lastFound[lang]}: ${new Date(
            cache.last_found,
          ).toLocaleString()}`}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          icon="close"
          mode="outlined"
          color={theme.secondaryColor}
          style={styles.button}
          onPress={() => dispatch(setSelectedCacheId(null))}>
          {dictionary.close[lang]}
        </Button>
        <Button
          icon="chevron-double-right"
          mode="contained"
          style={{...styles.button, backgroundColor: theme.secondaryColor}}
          onPress={() => navigation.navigate('Cache', {code: cache.code})}>
          {dictionary.details[lang]}
        </Button>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <BottomSheet
        snapPoints={[Dimensions.get('window').height / 2, 50, 50]}
        renderContent={() => renderContent()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: 250,
    padding: 20,
    backgroundColor: '#fff',
    borderTopColor: '#b8e994',
    borderTopWidth: 5,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 24,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
    height: 40,
  },
  data: {
    marginBottom: 15,
  },
});

export default memo(withNavigation(CacheSheet));
