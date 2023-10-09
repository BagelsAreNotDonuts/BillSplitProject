import React, { useState, useContext} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Menu } from 'react-native-paper';
import { BillProvider , BillContext} from './BillProvider';

const CustomHeaderTitle = () => {
  const { category, setCategory } = useContext(BillContext);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Menu
        visible={isPickerVisible}
        onDismiss={() => setIsPickerVisible(false)}
        anchor={
          <TouchableOpacity onPress={() => setIsPickerVisible(true)}>
            <Text style={{ color: 'white', fontSize: 18 }}>
              {category} Bills
            </Text>
          </TouchableOpacity>
        }>
        <Menu.Item onPress={() => { setCategory('All'); setIsPickerVisible(false); }} title="All" />
        <Menu.Item onPress={() => { setCategory('Food'); setIsPickerVisible(false); }} title="Food" />
        <Menu.Item onPress={() => { setCategory('Rent'); setIsPickerVisible(false); }} title="Rent" />
        <Menu.Item onPress={() => { setCategory('Others'); setIsPickerVisible(false); }} title="Others" />
      </Menu>
    </View>
  );
};

export default CustomHeaderTitle;
