import React from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
import { View, Text } from 'react-native';

function CustomBackButton({ navigation }) {
  const handleCustomBackAction = () => {
    console.log('Back button pressed');
    navigation.goBack(); // Perform the default back action
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <HeaderBackButton onPress={handleCustomBackAction} />
      <Text>Back</Text> {/* You can customize this part */}
    </View>
  );
}

export default CustomBackButton;
