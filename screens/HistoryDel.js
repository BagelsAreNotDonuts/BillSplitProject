import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  useColorScheme,
} from 'react-native';
import {BillContext} from '../components/BillProvider';
import {Picker} from '@react-native-picker/picker';

export default function HistoryPage() {
  const isDarkMode = useColorScheme() === 'dark';
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const {category} = useContext(BillContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [isBillDetailModalVisible, setBillDetailModalVisible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const openBillDetail = bill => {
    setSelectedBill(bill);
    setBillDetailModalVisible(true);
  };

  const fetchBills = async () => {
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
            query: 'SELECT * FROM Bills',
          }),
        },
      );
      const data = await response.json();
      setBills(data);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const deleteBill = async billId => {
    try {
      // Delete related records from IndividualCosts
      await fetch('https://second-petal-398210.ts.r.appspot.com/database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: 'root',
          pass: 'root',
          db_name: 'plutus',
          query: `DELETE FROM IndividualCosts WHERE billID = ${billId}`,
        }),
      });

      // Delete the bill from Bills
      await fetch('https://second-petal-398210.ts.r.appspot.com/database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: 'root',
          pass: 'root',
          db_name: 'plutus',
          query: `DELETE FROM Bills WHERE billID = ${billId}`,
        }),
      });

      // Refresh bills
      fetchBills();
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  };
  //console.log(bills);

  useEffect(() => {
    let filtered = bills;

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(bill => bill.billCat === category);
    }
    console.log('After category filter:', filtered);

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(bill =>
        bill.billTitle.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    console.log('After search term filter:', filtered);

    // Filter by month
    console.log(
      'All bill dates:',
      bills.map(bill => bill.billDateTime),
    );
    filtered = filtered.filter(bill => {
      try {
        const billDate = new Date(bill.billDateTime.replace(/\//g, '-')); // replace '/' with '-'
        console.log('Parsed date:', billDate);
        return billDate.getMonth() === currentMonth;
      } catch (error) {
        console.error('Error parsing date:', bill.billDateTime, error);
        return false;
      }
    });
    console.log('After month filter:', filtered);

    setFilteredBills(filtered);
  }, [bills, category, searchTerm, currentMonth]);

  const changeMonth = offset => {
    setCurrentMonth(prev => (prev + offset) % 12);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.monthNavigator}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Text style={styles.arrow}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.month}>
          {new Date(0, currentMonth).toLocaleString('default', {month: 'long'})}
        </Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <Text style={styles.billsText}>Bills</Text>

      {filteredBills.map((bill, index) => (
        <View key={index} style={styles.billBox}>
          <TouchableOpacity
            onPress={() => openBillDetail(bill)}
            style={styles.billInfo}>
            <Text style={styles.title}>{bill.billTitle}</Text>
            <Text style={styles.description}>{bill.billDesc}</Text>
            <View style={styles.bottomRow}>
              <Text style={styles.timestamp}>
                {
                  new Date(bill.billDateTime.replace(/\//g, '-'))
                    .toISOString()
                    .split('T')[0]
                }
              </Text>
              <Text style={styles.cost}>${bill.totalCost}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.markAsPaidButton}
            onPress={() => markAsPaid(bill)}>
            <Text style={styles.markAsPaidText}>Mark as Paid</Text>
          </TouchableOpacity>
        </View>
      ))}
      {selectedBill && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isBillDetailModalVisible}
          onRequestClose={() => setBillDetailModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setBillDetailModalVisible(false)}>
                <Text style={styles.textStyle}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedBill.billTitle}</Text>
              <Text style={styles.modalText}>
                <Text style={styles.label}>Amount:</Text> $
                {selectedBill.totalCost}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.label}>Description:</Text>{' '}
                {selectedBill.billDesc}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.label}>Category:</Text>{' '}
                {selectedBill.billCat}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.label}>Time:</Text>{' '}
                {
                  new Date(selectedBill.billDateTime.replace(/\//g, '-'))
                    .toISOString()
                    .split('T')[0]
                }
              </Text>
              <TouchableOpacity
                style={styles.markAsPaidButton}
                onPress={() => deleteBill(selectedBill.billID)}>
                <Text style={styles.textStyle}>Delete Bill</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: 'white',
  },
  picker: {
    height: 50,
    width: 150,
    color: 'white',
  },
  monthNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  arrow: {
    fontSize: 24,
    color: 'white',
  },
  month: {
    fontSize: 18,
    color: 'white',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 10,
    color: 'white',
  },
  billsText: {
    fontSize: 18,
    color: 'white',
    marginVertical: 10,
  },
  billBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#131313',
  },
  billInfo: {
    flex: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cost: {
    fontSize: 14,
    color: 'white',
  },
  markAsPaidButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  markAsPaidText: {
    color: 'white',
    fontSize: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: 'white',
  },
  timestamp: {
    fontSize: 12,
    color: 'white',
    textAlign: 'right',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    top: 15,
    left: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    color: 'white',
    textAlign: 'center',
  },
});
