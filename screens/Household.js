import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Fetch from './FetchDemo';
import PushData from './InsertDemo';
import {
  View,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import {
  colors,
  styles,
  colorScheme,
  deviceWidth,
  deviceHeight,
} from '../data/themes';
import {useState, useEffect} from 'react';
const { width } = Dimensions.get('window');

export default function Household() {
    const navigation = useNavigation();
    //Use state containing the data on all the members of the household
    const [householdMembers,sethouseholdMembers] = useState([]);
    const [currentUserID, setCurrentUserID] = useState(1);


    //Gets all housemate data and sets useState
    async function getMemberData() {
    try {
      const response = await fetch(
        'https://second-petal-398210.ts.r.appspot.com/database',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: 'root',
            pass: 'root',
            db_name: 'plutus',
            query: 'select * FROM CreditScore',
          }),
        },
      );
        const result = await response.json(); // I'm using json() because text() makes it not work properly?
        sethouseholdMembers(result);
    } catch (error) {
        console.error('Error fetching data for housemate stuff:', error);
    }
    }

    useEffect(() => {
        getMemberData();
        console.log(householdMembers);
    }, []);

    function MemberItem({id}) {
        var userData =
          typeof householdMembers[0] === 'undefined'
            ? 0
            : householdMembers.find(entry => entry.userID == id);
        var name =
          typeof userData.userName === 'undefined' ? (
            <Text>Loading</Text>
          ) : (
            userData.userName
          );
        var userID = typeof userData.userID === 'undefined' ? 0 : userData.userID;

        return (
        <View style={styles.householdStyles.scrollViewItem}>
            <Text style={{textAlignVertical:"center", alignItems: "center", color: 'white',
            fontSize: deviceWidth * 0.038,}}>
              {name + (userID == currentUserID ? '' : '')}
            </Text>

        </View>
        );
      }

    return (
    <View style = {styles.householdStyles.container}>
         <Text style = {{height: "7%",flexDirection:"row",width: "90%"
         ,fontSize: deviceWidth * 0.038, textAlignVertical:"center"}}>
         Make any changes to your household here.</Text>
         <Text style = {{height: "7%",flexDirection:"row",width: "90%", color: "white"
          ,fontSize: deviceWidth * 0.038, textAlignVertical:"center", paddingBottom: "1%"}}>
          Household members</Text>

        <ScrollView
            horizontal={false}
            style={styles.householdStyles.memberScrollView}
            contentContainerStyle={{flexGrow: 1}}
            overScrollMode={'never'}>

            {typeof householdMembers[0] === 'undefined' ? (
              <Text>Loading...</Text>
            ) : (
              householdMembers.map(entry => (
                <MemberItem key={entry.userID} id={entry.userID}/>
              ))
            )}
        </ScrollView>

        <TouchableOpacity
          style={styles.householdStyles.addNewMemberButton}
          onPress={() => {}}>
          <Text style={styles.householdStyles.addNewMemberText}>
            + Add new member
          </Text>
        </TouchableOpacity>
    </View>

  );
}

