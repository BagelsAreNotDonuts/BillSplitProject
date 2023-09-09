import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, useColorScheme } from 'react-native';

import magnifyGlass from '../../assets/magnifying_glass.png';

export default function NewBill({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';
    const names = ['Todd Holland (you)', 'Robert Downey Sr.', 'Redd Johansson', 'Donald Schaw whatever'];
    const [selectedNames, setSelectedNames] = useState([]);
  
    const handleCheckbox = (name) => {
      if (selectedNames.includes(name)) {
        setSelectedNames(prevNames => prevNames.filter(item => item !== name));
      } else {
        setSelectedNames(prevNames => [...prevNames, name]);
      }
    };

    const handleNext = () => {
        //here navigate to the next screen and pass the selectedNames array
        console.log(selectedNames); //connsole log selected names
        navigation.navigate('SelectMember', { selectedNames: selectedNames });
      };

  return (
    <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>
        1. Please select the household members involved in this bill
      </Text>

      <View style={styles.searchBar}>
        <TextInput placeholder="Search..." style={styles.searchInput} />
        <Image source={magnifyGlass} style={styles.searchIcon} />
      </View>

      <Text style={[isDarkMode ? styles.darkText : styles.lightText, { marginBottom: 20 }]}>Household members</Text>

      <View style={styles.columnsContainer}>
        {names.map((name, index) => (
            <View key={index} style={styles.column}>
                <View style={styles.greyCircle} />
                <Text style={[isDarkMode ? styles.darkText : styles.lightText, styles.nameText]}>{name}</Text>
                <TouchableOpacity onPress={() => handleCheckbox(name)} style={styles.checkbox}>
                    {selectedNames.includes(name) && <View style={styles.checked} />}
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
    checked: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#000', // or any color you prefer
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