import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  useColorScheme,
  Switch,
} from 'react-native';
import { Alert } from 'react-native';

export default function SelectCost({route, navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const initialNames = route.params.selectedNames;
  const [totalAmount, setTotalAmount] = useState('');
  const [isDollar, setIsDollar] = useState(true); // Switch between $ and %
  const [individualAmounts, setIndividualAmounts] = useState({});

  const handleAmountChange = (id, value) => {
    setIndividualAmounts(prev => ({...prev, [id]: value}));
  };

  const handleNext = () => {
    if (isNaN(totalAmount) || parseFloat(totalAmount) <= 0) {
      Alert.alert('Please enter a valid total amount.');
      return;
    }

    // Check if individual amounts are numbers and calculate the total
    let totalIndividualAmounts = 0;
    for (let id in individualAmounts) {
      if (
        isNaN(individualAmounts[id]) ||
        parseFloat(individualAmounts[id]) <= 0
      ) {
        Alert.alert('Please enter valid amounts for each individual.');
        return;
      }
      totalIndividualAmounts += parseFloat(individualAmounts[id]);
    }

    // Check if all individuals have an amount entered
    if (initialNames.length !== Object.keys(individualAmounts).length) {
      Alert.alert('Please enter amounts for all individuals.');
      return;
    }

    // Check if individual amounts add up to total amount
    if (isDollar && parseFloat(totalAmount) !== totalIndividualAmounts) {
      Alert.alert('The individual amounts do not add up to the total amount.');
      return;
    }
    const amountsToSend = isDollar ? individualAmounts : {};
    if (!isDollar) {
      for (let id in individualAmounts) {
        amountsToSend[id] =
          (parseFloat(totalAmount) * parseFloat(individualAmounts[id])) / 100;
      }
    }
    
    console.log('SelectCost console ', totalAmount, amountsToSend);
    // Pass the data to the next screen
    navigation.navigate('BillDescription', {
      totalAmount: totalAmount,
      individualAmounts: amountsToSend,
      userIDs: initialNames.map(item => item.id),
      userNames: initialNames.map(item => item.name)
  });
  };
  useEffect(() => {
    // Force a re-render when the color scheme changes
    setTotalAmount(prev => prev);
  }, [isDarkMode]);

  return (
    <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>
        2. Enter the total bill amount
      </Text>

      <View style={styles.inputBar}>
        <TextInput
          style={[
            styles.amountInput,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
          keyboardType="numeric"
          value={totalAmount}
          onChangeText={setTotalAmount}
          placeholder="$0.00"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>
          Please adjust the distribution accordingly
        </Text>
        <TouchableOpacity onPress={() => setIsDollar(!isDollar)}>
          <Text
            style={[
              isDarkMode ? styles.darkText : styles.lightText,
              {marginLeft: 10},
            ]}>
            {isDollar ? '$' : '%'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.columnsContainer}>
        {initialNames.map(item => (
          <View key={item.id} style={styles.column}>
            <View style={styles.greyCircle} />
            <Text
              style={[
                isDarkMode ? styles.darkText : styles.lightText,
                styles.nameText,
              ]}>
              {item.name}
            </Text>
            <TextInput
              style={[
                styles.amountInput,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}
              keyboardType="numeric"
              value={individualAmounts[item.id] || ''}
              onChangeText={value => handleAmountChange(item.id, value)}
              placeholder={isDollar ? '$0.00' : '0.00%'}
            />
          </View>
        ))}
      </View>

      {totalAmount && (
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
