import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

/***
 * A demo history page
 */
export default function HistoryPage() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    async function fetchBills() {
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
            query: 'SELECT * FROM Bills'
          })
        });
        const data = await response.json();
        setBills(data);
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    }

    fetchBills();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {bills.map((bill, index) => (
        <View key={index} style={styles.billBox}>
          <Text style = {styles.historyText}>Bill ID: {bill.billID}</Text>
          <Text style = {styles.historyText}>User ID: {bill.userID}</Text>
          <Text style = {styles.historyText}>Total Cost: {bill.totalCost}</Text>
          <Text style = {styles.historyText}>Category: {bill.billCat}</Text>
          <Text style = {styles.historyText}>Title: {bill.billTitle}</Text>
          <Text style = {styles.historyText}>Description: {bill.billDesc}</Text>
          <Text style = {styles.historyText}>Date & Time: {bill.billDateTime}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  historyText : {
    color: "white",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black'
  },
  billBox: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#131313',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3
  }
});
