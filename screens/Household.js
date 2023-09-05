import React from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Fetch from './FetchDemo';
import PushData from './InsertDemo';

const { width } = Dimensions.get('window');

export default function Household() {
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <Button 
        title="Go to InsertDemo" 
        onPress={() => navigation.navigate('InsertDemo')} 
      />
      <Button 
        title="Go to FetchDemo" 
        onPress={() => navigation.navigate('FetchDemo')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
  },
  column: {
    flex: 1,
    backgroundColor: 'grey', // Just for visualization
    height: '50%',
  },
});
