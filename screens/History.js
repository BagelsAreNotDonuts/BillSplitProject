// screens/Home.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NewBill from './Create/NewBill'
import {colors, styles, colorScheme, deviceWidth, deviceHeight} from '../data/themes';

export default function History() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  return (
    <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>
        Dark Mode is {isDarkMode ? 'Enabled' : 'Disabled'}
      </Text>
      <TouchableOpacity 
        style={styles.dashboardStyles.createBillButton}
        onPress={() => navigation.navigate(NewBill)}
      >
        <Text style={styles.dashboardStyles.createBillText}>Create new bill</Text>
      </TouchableOpacity>
    </View>
  );
}

//const styles = StyleSheet.create({
//  lightContainer: {
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//    backgroundColor: '#FFFFFF',
//  },
//  darkContainer: {
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//    backgroundColor: '#000000',
//  },
//  lightText: {
//    color: '#000000',
//  },
//  darkText: {
//    color: '#FFFFFF',
//  },
//  button: {
//    marginTop: 20,
//    width: Dimensions.get('window').width * 0.33,
//    height: 50,
//    justifyContent: 'center',
//    alignItems: 'center',
//    borderRadius: 25, // This will make it semi-round
//    borderColor: 'blue',
//    borderWidth: 2,
//    backgroundColor: 'white',
//  },
//  buttonText: {
//    color: 'blue',
//  },
//});
