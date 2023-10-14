import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, useColorScheme } from 'react-native';
import { useEffect } from 'react';

import magnifyGlass from '../../assets/magnifying_glass.png';

export default function NewBill({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [names, setNames] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://second-petal-398210.ts.r.appspot.com/database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: 'root',
          pass: 'root',
          db_name: 'plutus',
          query: 'SELECT userID, userName FROM CreditScore'
        })
      });
      const result = await response.json();
      setNames(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckbox = (id, name) => {
    if (selectedNames.some(item => item.id === id)) {
      setSelectedNames(prevNames => prevNames.filter(item => item.id !== id));
    } else {
      setSelectedNames(prevNames => [...prevNames, {id, name}]);
    }
  };

  const handleNext = () => {
      console.log('NewBill Console: ',selectedNames);
      navigation.navigate('SelectMember', { selectedNames: selectedNames });
  };

  return (
    <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>
        1. Please select the household members involved in this bill
      </Text>
      <View style={styles.columnsContainer}>
        {names.map((item) => (
            <View key={item.userID} style={styles.column}>
                <View style={styles.greyCircle} />
                <Text style={[isDarkMode ? styles.darkText : styles.lightText, styles.nameText]}>{item.userName}</Text>
                <TouchableOpacity onPress={() => handleCheckbox(item.userID, item.userName)} style={styles.checkbox}>
                    {selectedNames.some(selected => selected.id === item.userID) && <View style={isDarkMode? styles.checkedDark : styles.checkedLight} />}
                </TouchableOpacity>
            </View>
        ))}
      </View>

      {selectedNames.length > 0 && (
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    )}
  </View>
);
}

const styles = StyleSheet.create({
    lightContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: '#FFFFFF',
    },
    darkContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: '#000000',
    },
    lightText: {
      color: '#000000',
      fontSize: 16,
      marginBottom: 10,
    },
    darkText: {
      color: '#FFFFFF',
      fontSize: 16,
      marginBottom: 10,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 25,
      paddingLeft: 15,
      paddingRight: 45, // to account for the icon
      marginBottom: 20,
    },
    searchInput: {
      flex: 1,
      height: 40,
    },
    searchIcon: {
      position: 'absolute',
      right: 15,
      width: 20,
      height: 20,
    },
    greyCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'grey',
      },
    
    columnsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 20,
    },
    nameText: {
        marginLeft: 5, // This will give a 5px margin to the name from the grey circle
        flex: 1, // This will allow the name to take up the available space
    },

    column: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
        height: 60,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        justifyContent: 'flex-start', // This will align items to the left
        width: '100%',
    },
    icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    },
    checkbox: {
    marginLeft: 10,
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    },
    checkedLight: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#000', // Black for light mode
    },
    checkedDark: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#FFF', // White for dark mode
    },
    nextButton: {
      alignSelf: 'center',
      backgroundColor: 'blue',
      borderRadius: 25,
      paddingHorizontal: 100,
      paddingVertical: 20,
      position: 'absolute',
      bottom: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });