// screens/Home.js
import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';



export default function History() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>
        Dark Mode is {isDarkMode ? 'Enabled' : 'Disabled'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  darkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  lightText: {
    color: '#000000',
  },
  darkText: {
    color: '#FFFFFF',
  },
});