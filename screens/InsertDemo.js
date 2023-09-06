import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

/**
 * An insert demo
 * For referencing only
 * Change the query depending on what you want to achieve
 * @returns 
 */
const PushData = () => {
  const [response, setResponse] = useState(null);

  const pushData = async () => {
    try {
      const query = 'INSERT INTO testTable (testId, testName) VALUES (5,\'SaberFate\');';
      const response = await fetch('https://second-petal-398210.ts.r.appspot.com/database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: 'root',
          pass: 'root',
          db_name: 'users',
          query: query
        })
      });
      const result = await response.text();
      setResponse(result);
    } catch (error) {
      console.error('Error pushing data:', error);
    }
  };

  return (
    <View>
      <Button title="Push Data" onPress={pushData} />
      {response && <Text style={{color:'black'}}>Data pushed successfully: {response}</Text>}
    </View>
  );
};

export default PushData;
