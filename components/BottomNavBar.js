import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import global from '../global/global';
import {colors, styles} from '../data/themes';
import { useRefreshState } from '.././RefreshStateContext';

const BottomNavBar = () => {
  const {refreshState, toggleRefresh} = useRefreshState();
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark'; // Use system setting

  return (
    <View style={[styles.bottomNavbarStyles.container, isDarkMode ? styles.bottomNavbarStyles.darkContainer : styles.bottomNavbarStyles.lightContainer]}>
      <TouchableOpacity onPress={() =>
      {navigation.navigate('Dashboard');
      toggleRefresh();}
      } style={styles.bottomNavbarStyles.navItem}>
        <Image source={isDarkMode ? global.dashboardWhite : global.dashboard} style={styles.bottomNavbarStyles.icon} />
        <Text style={[styles.label, isDarkMode ? styles.bottomNavbarStyles.darkText : styles.bottomNavbarStyles.lightText]}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('History')} style={styles.bottomNavbarStyles.navItem}>
        <Image source={isDarkMode ? global.historyWhite : global.history} style={styles.bottomNavbarStyles.icon} />
        <Text style={[styles.bottomNavbarStyles.label, isDarkMode ? styles.bottomNavbarStyles.darkText : styles.bottomNavbarStyles.lightText]}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Household')} style={styles.bottomNavbarStyles.navItem}>
        <Image source={isDarkMode ? global.householdWhite : global.household} style={styles.bottomNavbarStyles.icon} />
        <Text style={[styles.bottomNavbarStyles.label, isDarkMode ? styles.bottomNavbarStyles.darkText : styles.bottomNavbarStyles.lightText]}>Household</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavBar;