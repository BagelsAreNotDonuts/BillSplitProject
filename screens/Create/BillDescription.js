import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, useColorScheme, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function BillDescription({ route, navigation }) {
  const isDarkMode = useColorScheme() === 'dark';
  const { totalAmount, individualAmounts } = route.params;

  const [category, setCategory] = useState('Rent');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState(new Date());

  const handleNext = () => {
    // Send post request here
    const data = {
      totalAmount,
      individualAmounts,
      category,
      title,
      description,
      dateTime
    };
    console.log('BillDescription Console ',data);
    // TODO: Send data to the server
  };
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const onChangeDate = (event, selectedDate) => {
    setDatePickerVisible(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setTimePickerVisible(true);  // Show the time picker after selecting a date
    }
  };
  
  const onChangeTime = (event, selectedTime) => {
    setTimePickerVisible(false);
    if (selectedTime) {
      setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate(), selectedTime.getHours(), selectedTime.getMinutes()));
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
    <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>
        4. Please select appropriate category
      </Text>

      <Picker
        selectedValue={category}
        style={{ height: 50, width: '100%' }}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Rent" value="Rent" />
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Others" value="Others" />
      </Picker>

        <Text style={isDarkMode ? styles.darkText : styles.lightText}>
          Please add a title
        </Text>
        <TextInput 
          style={[styles.input, isDarkMode ? styles.darkText : styles.lightText]}
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
        />

        <Text style={isDarkMode ? styles.darkText : styles.lightText}>
          Please add a description (optional)
        </Text>
        <TextInput 
          style={[styles.largeInput, isDarkMode ? styles.darkText : styles.lightText]}
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          multiline={true}
        />
        <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
          <Text style={isDarkMode ? styles.darkText : styles.lightText}>
            Please select a time when the payment must be sent by
          </Text>
          <Text style={[styles.input, isDarkMode ? styles.darkText : styles.lightText]}>
            {dateTime.toLocaleString()}
          </Text>
        </TouchableOpacity>
        {isDatePickerVisible && (
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="default"
        onChange={onChangeDate}
      />
        )}
        {isTimePickerVisible && (
          <DateTimePicker
            value={selectedDate}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}
        {(category && title) && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
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
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  largeInput: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    height: 150,
    width: '100%',
    textAlignVertical: 'top', // For multiline input
  },
});