// screens/Home.js
import React from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function Hashboard() {
  return (
    <View style={styles.container}>
      <Button title="Top Center Button" onPress={() => {}} />
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