import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, useColorScheme,Alert  } from 'react-native';
import { useEffect } from 'react';
//import HouseholdScreen from '../Household';
import { LogBox } from 'react-native';
import {
  colors,
  colorScheme,
  deviceWidth,
  deviceHeight,
} from '../../data/themes';

import magnifyGlass from '../../assets/magnifying_glass.png';

export default function AddMember({navigation,route}) {
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);
    const {householdMembers, refreshState, setRefreshState} = route.params;
    const [userName, setUserName] = useState("");
    const [newMembers, setNewMembers] = useState(householdMembers);

    async function insertNewMember() {
      try {
        const query = `INSERT INTO CreditScore (score, userName) VALUES (0, '${userName}');`;
        const response = await fetch('https://second-petal-398210.ts.r.appspot.com/database', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: 'root',
            pass: 'root',
            db_name: 'plutus',
            query: query,
            //values: [5, "JohnDoe"] // Provide the values as an array
          })
        });
        const result = await response.text();
        console.log(userName);
      } catch (error) {
        console.error('Error pushing data:', error);
      }
    }

     handleUsernameChange = (text) => {
        setUserName(text);
      }

      handleSubmit = () => {
        const validUsername = /^[A-Za-z\s]{1,15}$/.test(userName);

        if (validUsername) {
          insertNewMember();
          Alert.alert('Member successfully added.', `Username: ${userName}`);
          navigation.goBack();
          setRefreshState(!refreshState);
        } else {
          Alert.alert('Invalid Username', 'Username should contain only letters and be 15 characters or less.');
        }
      }

        return (
          <View style = {styles.darkContainer}>
            <TextInput
              style = {styles.inputField}
              placeholder="Enter member name"
              value={userName}
              onChangeText={handleUsernameChange}
              placeholderTextColor="white"
              multiline={true}
            />
            <TouchableOpacity style = {styles.submitButton}onPress={handleSubmit}>
                <Text style = {styles.submitButtonText} >Submit</Text>
            </TouchableOpacity>
          </View>
        );
}

const styles = StyleSheet.create({
    darkContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: 'black',
      alignItems: "center"
    },
    inputField: {
        height: deviceHeight*0.08,
        width: "89%",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        color: "white",
        paddingLeft: "3%",
        paddingRight: "3%",
        fontSize: deviceWidth * 0.038,
        backgroundColor: "black",
        //textAlign: "center",
    },
    submitButton: {
     height: deviceHeight*0.05,
    width: "89%",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#3A82F6',
    borderWidth: 1  ,
    backgroundColor: 'black',
    fontSize: deviceWidth * 0.038,
    marginTop: "5%"
    },
    submitButtonText: {
        fontSize: deviceWidth * 0.038,
        color: "#3A82F6",
    }
  });