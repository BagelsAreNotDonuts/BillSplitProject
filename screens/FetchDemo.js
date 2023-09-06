import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';


/** A fetch demo for reference
 * Follow the tables on slacks to change the queries 
 * Change the query depending on what data you need to fetch 
 */
const Fetch = () => {
  const [data, setData] = useState(null);

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
          db_name: 'users',
          query: 'select * from testTable'
        })
      });
      const result = await response.text();  // Use .text() instead of .json()
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <Text style={{color:'black'}}>{data}</Text>
    </View>
  );
};

export default Fetch;