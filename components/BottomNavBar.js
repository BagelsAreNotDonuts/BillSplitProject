import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import global from '../global/global';

const BottomNavBar = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark'; // Use system setting

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.navItem}>
        <Image source={isDarkMode ? global.dashboardWhite : global.dashboard} style={styles.icon} />
        <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('History')} style={styles.navItem}>
        <Image source={isDarkMode ? global.historyWhite : global.history} style={styles.icon} />
        <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Household')} style={styles.navItem}>
        <Image source={isDarkMode ? global.householdWhite : global.household} style={styles.icon} />
        <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>Household</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  label: {
    fontSize: 14,
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
});

export default BottomNavBar;