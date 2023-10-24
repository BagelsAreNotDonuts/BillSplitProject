import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Fetch from './FetchDemo';
import PushData from './InsertDemo';
import AddMember from './Create/AddMember';
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
    const [refreshState,setRefreshState] = useState([false]);
    const [currentUserID, setCurrentUserID] = useState(1);
    const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
    const [selectedDeletionID,setSelectedDeletionID] = useState(null);
    const [selectedDeletionName,setSelectedDeletionName] = useState(null);


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

    //Deletes member from credit score depending on member
        async function deleteFromCreditScore(id) {
        const query = `DELETE FROM CreditScore WHERE userID = '${id}'`;
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
                query: query,
              }),
            },
          );
            const result = await response.json(); // I'm using json() because text() makes it not work properly?
            await console.log(result);
        } catch (error) {
            console.error('Error fetching data for housemate stuff:', error);
        }
        }

        //Deletes member from credit score depending on member
                async function deleteFromIndividualCosts(id) {
                const query = `DELETE * FROM IndividualCosts WHERE userID = '${id}'`;
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
                        query: query,
                      }),
                    },
                  );
                    const result = await response.json(); // I'm using json() because text() makes it not work properly?
                    await console.log(result);
                } catch (error) {
                    console.error('Error fetching data for housemate stuff:', error);
                }
                }

    useEffect(() => {
        getMemberData();
        //console.log(householdMembers);
    }, [refreshState]);

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
            fontSize: deviceWidth * 0.038,borderWidth: 0, borderColor: "red",width: "92%"}}>
              {name + (userID == currentUserID ? '' : '')}
            </Text>
            <View style={{textAlignVertical:"center", alignItems: "center", color: 'white',
            fontWeight: "bold",
            fontSize: deviceWidth * 0.040, height: "100%",justifyContent:"center"}}>
              <Text style = {{fontSize: deviceWidth * 0.040, fontWeight:"bold",
              color:"white"}} onPress={async () =>
              {
              console.log(userID);
              //deleteFromCreditScore(userID);

              //setRefreshState(!refreshState);
              await setSelectedDeletionID(userID);
              await setSelectedDeletionName(name);
              if (userID != currentUserID) {
                setConfirmModalVisible(!isConfirmModalVisible);
              }

              }}> X</Text>
            </View>

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
          onPress={() => navigation.navigate('AddMember',{householdMembers: householdMembers
          ,refreshState:refreshState,setRefreshState:setRefreshState})}
          >
          <Text style={styles.householdStyles.addNewMemberText}>
            + Add new member
          </Text>
        </TouchableOpacity>

        <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isConfirmModalVisible}
                    onRequestClose={() => {
                      setConfirmModalVisible(!isConfirmModalVisible)
                    }}>

                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                          Remove {selectedDeletionName} from the household?
                        </Text>
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() =>
                            {
                            setConfirmModalVisible(!isConfirmModalVisible);
                            deleteFromCreditScore(selectedDeletionID);
                            deleteFromIndividualCosts(selectedDeletionID);
                            setRefreshState(!refreshState);
                            }}>
                            <Text style={styles.textStyle}>Yes</Text>
                        </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() =>
                            {
                            setConfirmModalVisible(!isConfirmModalVisible);
                            console.log(selectedDeletionID)}}>
                            <Text style={styles.textStyle}>No</Text>
                          </TouchableOpacity>

                        </View>
                      </View>
                    </View>

            </Modal>
    </View>

  );
}

