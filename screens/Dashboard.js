// screens/Home.js
import React from 'react';
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
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useState, useEffect} from 'react';
import NewBill from './Create/NewBill';
import {useNavigation} from '@react-navigation/native';

//NOTE USE horizontal: true FOR SCROLL VIEW
export default function Dashboard() {
  const navigation = useNavigation();

  const [currentUserID, setCurrentUserID] = useState(1);
  const [userCreditScore, setUserCreditScore] = useState(0);
  const [housemateCreditScoreData, setHousemateCreditScoreData] = useState([]);
  const [userRentBillData, setUserRentBillData] = useState([]);
  const [userFoodBillData, setUserFoodBillData] = useState([]);
  const [userOtherBillData, setUserOtherBillData] = useState([]);
  const [refreshState, setRefreshState] = useState(false);
  const [toggleShowOwe, setToggleShowOwe] = useState(true);

  //Gets all the housemate credit scores
  async function getHousemateCreditScores() {
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
      setHousemateCreditScoreData(result);
    } catch (error) {
      console.error('Error fetching data for housemate stuff:', error);
    }
  }
  //A better way to do this is make a function that changes the query and useState set based on case, but I'm too lazy rn.
  //Gets the user's rent bill data
  async function getUserRentBillData() {
    try {
      const query = `SELECT * FROM Bills WHERE userID = ${currentUserID} AND billCat = 'Rent';`;
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
      console.log('Dashboard fetch Rent', result);
      console.log('--------------------------------------------------------');
      setUserRentBillData(result);
    } catch (error) {
      console.error('Error fetching data for housemate stuff:', error);
    }
  }

  async function getUserFoodBillData() {
    try {
      const query = `SELECT * FROM Bills WHERE userID = ${currentUserID} AND billCat = 'Food';`;
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
      console.log('Dashboard fetch Food', result);
      console.log('--------------------------------------------------------');
      setUserFoodBillData(result);
    } catch (error) {
      console.error('Error fetching data for housemate stuff:', error);
    }
  }
  async function getUserOtherBillData() {
    try {
      const query = `SELECT * FROM Bills WHERE userID = ${currentUserID} AND billCat = 'Other';`;
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
      console.log('Dashboard fetch Other', result);
      console.log('--------------------------------------------------------');
      setUserOtherBillData(result);
    } catch (error) {
      console.error('Error fetching data for housemate stuff:', error);
    }
  }

  async function updateUserCreditScore(newCreditScore) {
    const query = `UPDATE CreditScore SET score = ${newCreditScore} WHERE userID = ${currentUserID};`;
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
      const result = await response.json();
    } catch (error) {
      console.error('Error fetching data for housemate stuff:', error);
    }
  }

  //Loads the credit score into the usestate, etc. To load data live add the required things to update based on into the [].
  useEffect(() => {
    getUserRentBillData();
    getUserFoodBillData();
    getUserOtherBillData();
    getHousemateCreditScores();

//    typeof currentUserData.score === 'undefined'
//      ? setUserCreditScore(0)
//      : setUserCreditScore(currentUserData.score);
//      console.log(userCreditScore);
  }, [currentUserID, refreshState]);
  console.log(
    typeof housemateCreditScoreData[0] === 'undefined'
      ? "IT'S STILL LOADING"
      : housemateCreditScoreData,
  );

  //--------------------------------VARIABLES AND ASSOCIATED FUNCTIONS----------------------------

  //Sets the user's credit score to the info drawn from the database, defaults to 5.
  var currentUserData =
    typeof housemateCreditScoreData[0] === 'undefined'
      ? 0
      : housemateCreditScoreData.find(entry => entry.userID == currentUserID);
  var currentUserScore =
    typeof currentUserData.score === 'undefined' ? 0 : currentUserData.score;

  //Goes through all the rent bills that need to be paid and sums them into the variable. Will have to adjust this to work with others later.
  //Should modularize these functions but I'm too lazy rn.
  function calculateRentToPay() {
    var rentSum = 0;
    if (typeof userRentBillData[0] !== 'undefined') {
      for (let i = 0; i < userRentBillData.length; i++) {
        rentSum += parseFloat(userRentBillData[i].totalCost);
      }
    }
    return rentSum;
  }

  //Should modularize these functions but I'm too lazy rn.
  function calculateFoodToPay() {
    var foodSum = 0;
    if (typeof userFoodBillData[0] !== 'undefined') {
      for (let i = 0; i < userFoodBillData.length; i++) {
        foodSum += parseFloat(userFoodBillData[i].totalCost);
      }
    }
    return foodSum;
  }

  //Should modularize these functions but I'm too lazy rn.
  function calculateOtherToPay() {
    var otherSum = 0;
    if (typeof userOtherBillData[0] !== 'undefined') {
      for (let i = 0; i < userOtherBillData.length; i++) {
        otherSum += parseFloat(userOtherBillData[i].totalCost);
      }
    }
    return otherSum;
  }

  var rentToPay = calculateRentToPay();

  var foodToPay = calculateFoodToPay();

  var otherToPay = calculateOtherToPay();

  //----------------------------------------------------------------------------------------------
  //CALCULATES THE USER'S CREDIT SCORE AND OVERDUE RENT PAYMENTS DEPENDING ON USER DATA AND UPDATES DATABASE
  var currentUserOverduePayments = 0;

  async function handleOverduePayments() {
    if (typeof housemateCreditScoreData[0] !== 'undefined') {
      console.log('Calculating overdue payments...');
      //Gets the current date and converts it into a string we are able to compare with the database's date.
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      //Gets the month in the right string format
      const month =
        currentDate.getMonth() + 1 < 10
          ? '0' + (currentDate.getMonth() + 1)
          : currentDate.getMonth() + 1; // Add 1 to get the correct month
      const day = currentDate.getDate();
      const formattedDate = `${year}/${month}/${day}`;

      //Can be modularized, I am too lazy :)
      userRentBillData.map(entry => {
        var entryDate = entry.billDateTime;
        if (entryDate < formattedDate) {
          console.log(entryDate);
          currentUserOverduePayments += 1;
        }
      });

      userOtherBillData.map(entry => {
        var entryDate = entry.billDateTime;
        if (entryDate < formattedDate) {
          console.log(entryDate);
          currentUserOverduePayments += 1;
        }
      });

      userFoodBillData.map(entry => {
        var entryDate = entry.billDateTime;
        if (entryDate < formattedDate) {
          console.log(entryDate);
          currentUserOverduePayments += 1;
        }
      });

//      var calculatedUserScore =
//        5 - currentUserOverduePayments < 0 ? 0 : 5 - currentUserOverduePayments;
//      if (userCreditScore != calculatedUserScore) {
//        console.log('Updating user credit score...');
//        updateUserCreditScore(calculatedUserScore);
//        setUserCreditScore(calculatedUserScore);
//      }
    }
  }
  //Sets the overdue payments right here. I know I can maybe use a usestate to make this work
  //better, but it's weird and not working how I want it to.
  handleOverduePayments();

  //----------------------------------------------------------------------------------------------

  var testOtherCostToPay = 0;
  var testFoodCostToBePaid = 60;
  var testRentCostToBePaid = 20;
  var testOtherCostToBePaid = 0;

  //Turns the credit score into a percentage to be used for the fill in the progress bar
  var creditScore = score => (score / 100) * 100;

  //Returns a hex color code depending on the score
  //The variant parameter determines what opacity is used, 0 for fully opaque, 1 for ?? opacity.
  var progressbarColor = (variant, user) => {
    var colorVariant = variant !== 0 && variant !== 1 ? 0 : variant;
    if (variant == 0) {
        return user == currentUserID ? "#5174F6" : "#6B7DAB"
    } else if (variant == 1) {
        return user == currentUserID ? 'rgba(81, 116, 246, 0.1)' : 'rgba(106, 125, 165, 0.1)'
    }
    //variant 1 is background color variant

        return "#5174F6";
//    switch (score) {
//      case 5:
//        return colorVariant == 0 ? '#3A82F6' : 'rgba(58, 130, 246, 0.1)'; // Blue
//      case 4:
//        return colorVariant == 0 ? '#61BF73' : 'rgba(97, 191, 115, 0.1)'; // Green
//      case 3:
//        return colorVariant == 0 ? '#B0D766' : 'rgba(176, 215, 102, 0.1)'; // Weird yellow
//      case 2:
//        return colorVariant == 0 ? '#FFEE58' : 'rgba(255, 238, 88, 0.1)'; // Yellow
//      case 1:
//        return colorVariant == 0 ? '#FF9B17' : 'rgba(255, 155, 23, 0.1)'; // Amber
//      case 0:
//        return colorVariant == 0 ? '#FC2222' : 'rgba(252, 34, 34, 0.1)'; // Red
//      default:
//        return '#000000'; // Default to black or another color of your choice
//    }
  };

  //---------------------------------------------COMPONENTS---------------------------------------

  //Component for the summary progress bar's number
  function ProgressbarText({user}) {
    var color = progressbarColor(0, user);

    return (
      //Displays the credit score number fixed to one decimal point score. {testOverduePayment} payment overdue
      <Text style={[styles.dashboardStyles.creditScoreText, {color}]}>
        {currentUserScore.toFixed(1)}
      </Text>
    );
  }

  //Component for the houseMate progress bar's number
  function HousemateProgressbarText({user,score}) {
    var color = progressbarColor(0,user);

    return (
      //Displays the credit score number fixed to one decimal point score. {testOverduePayment} payment overdue
      <Text style={[styles.dashboardStyles.housemateCreditScoreText, {color}]}>
        {score.toFixed(1)}
      </Text>
    );
  }

  //Component displaying the top segment of the summary section
  function DashboardSummaryTop({toggleShowOwe}) {
    var color = 'white';
    //Sums up costs that user needs to pay
    var sumOfToPayCosts = foodToPay + rentToPay + otherToPay;

    //Sums up costs user needs to be paid
    var sumOfToBePaidCosts =
      testFoodCostToBePaid + testRentCostToBePaid + testOtherCostToBePaid;
    if (toggleShowOwe && sumOfToPayCosts > 0) {
      color = '#FC2222';
    } else if (!toggleShowOwe && sumOfToBePaidCosts > 0) {
      color = '#3A82F6';
    }

    return (
      <>
        <View style={styles.dashboardStyles.summaryTop}>
          <Text style={styles.dashboardStyles.costSummaryHeader}>
            {toggleShowOwe ? 'You owe:' : "You're owed:"}
          </Text>
          <Text style={[styles.dashboardStyles.costSummaryText, {color}]}>
            $
            {toggleShowOwe
              ? sumOfToPayCosts.toFixed(2)
              : sumOfToBePaidCosts.toFixed(2)}
          </Text>
        </View>
      </>
    );
  }

  //Component displaying the bottom segment of the summary section
  function DashboardSummaryBottom() {
    return (
        <>
            <View style={styles.dashboardStyles.summaryBottom}>
                <TouchableHighlight
                    style={styles.dashboardStyles.viewBillsButton}
                    onPress={async () => {
                                setRefreshState(!refreshState);
                              }}>
                    <Text style={styles.dashboardStyles.viewBillsButtonText}>
                        {' '}
                        Refresh screen
                    </Text>
                </TouchableHighlight>
            </View>
        </>
    );
}

  //Component to display the money you're owed/owe for each category in the categories section
  //toggleShowOwe determines whether or not the user wants to see owe/owed, cost category to be paid/pay is the cost variable associated to the category you're displaying
  function CategoriesMoneyText({
    toggleShowOwe,
    costCategoryToBePaid,
    costCategoryToPay,
  }) {
    var color = 'white';
    //Changes the color depending on the user's toggling of the toggleShowOwe variable.
    if (!toggleShowOwe && costCategoryToBePaid > 0) {
      console.log(costCategoryToBePaid);
      color = '#3A82F6';
    } else if (toggleShowOwe && costCategoryToPay > 0) {
      color = '#FC2222';
    }
    return (
      <Text style={[styles.dashboardStyles.categoriesCostText, {color}]}>
        {toggleShowOwe && costCategoryToPay > 0 ? '-$' : '$'}
        {toggleShowOwe
          ? costCategoryToPay.toFixed(2)
          : costCategoryToBePaid.toFixed(2)}
      </Text>
    );
  }

  //Component displaying the right segment of the summary section
  function DashboardSummaryCategories() {
    return (
      <>
        <View style={styles.dashboardStyles.summaryCategories}>
          <View style={styles.dashboardStyles.summaryCategoriesFoodContainer}>
            <Text style={styles.dashboardStyles.categoriesHeaderText}>
              Food
            </Text>
            <CategoriesMoneyText
              toggleShowOwe={toggleShowOwe}
              costCategoryToBePaid={testFoodCostToBePaid}
              costCategoryToPay={foodToPay}
            />
          </View>
          <View style={styles.dashboardStyles.summaryCategoriesRentContainer}>
            <Text style={styles.dashboardStyles.categoriesHeaderText}>
              Rent
            </Text>
            <CategoriesMoneyText
              toggleShowOwe={toggleShowOwe}
              costCategoryToBePaid={testRentCostToBePaid}
              costCategoryToPay={rentToPay}
            />
          </View>
          <View style={styles.dashboardStyles.summaryCategoriesOtherContainer}>
            <Text style={styles.dashboardStyles.categoriesHeaderText}>
              Other
            </Text>
            <CategoriesMoneyText
              toggleShowOwe={toggleShowOwe}
              costCategoryToBePaid={testOtherCostToBePaid}
              costCategoryToPay={otherToPay}
            />
          </View>
        </View>
      </>
    );
  }

  //The individual progress bars for the members shown in the your household section
  function DashboardHousemateBar({id}) {
    var userData =
      typeof housemateCreditScoreData[0] === 'undefined'
        ? 0
        : housemateCreditScoreData.find(entry => entry.userID == id);
    var score = typeof userData.score === 'undefined' ? 0 : userData.score;
    if (userData.userID == currentUserID) {
      score = currentUserScore;
    }
    var name =
      typeof userData.userName === 'undefined' ? (
        <Text>Loading</Text>
      ) : (
        userData.userName
      );
    var userID = typeof userData.userID === 'undefined' ? 0 : userData.userID;

    return (
      <View style={styles.dashboardStyles.housemateCircularProgressBox}>
        <AnimatedCircularProgress
          size={deviceWidth * 0.25}
          width={7}
          fill={creditScore(score)}
          duration={0}
          rotation={0}
          tintColor={progressbarColor(0, userID)}
          //onAnimationComplete={() => console.log('Finished user circular progress animation.')}
          backgroundColor={progressbarColor(1, userID)}>
          {() => (
            <>
              <HousemateProgressbarText user={userID} score={score} />
            </>
          )}
        </AnimatedCircularProgress>
        <Text style={{textAlign: 'center', marginTop: 10, color: 'white'}}>
          {name.split(' ')[0] + (userID == currentUserID ? ' (you)' : '')}
        </Text>
      </View>
    );
  }

  //The scroll view component within the your household section.
  function DashboardHousemateScores() {
    return (
      <>
        <ScrollView
          horizontal={true}
          style={styles.dashboardStyles.housemateScrollView}
          overScrollMode={'never'}>
          {typeof housemateCreditScoreData[0] === 'undefined' ? (
            <Text>Loading...</Text>
          ) : (
            housemateCreditScoreData.map(entry => (
              <DashboardHousemateBar key={entry.userID} id={entry.userID} />
            ))
          )}
        </ScrollView>
      </>
    );
  }
  const [isHelpModalVisible, setHelpModalVisible] = useState(false);
  const [isContactModalVisible, setContactModalVisible] = useState(false);

  function OweToggleButton() {
     var color = 'white';
//    //Sums up costs that user needs to pay
//    var sumOfToPayCosts = foodToPay + rentToPay + otherToPay;
//
//    //Sums up costs user needs to be paid
//    var sumOfToBePaidCosts =
//      testFoodCostToBePaid + testRentCostToBePaid + testOtherCostToBePaid;
//
//    if (toggleShowOwe && sumOfToPayCosts > 0) {
//      color = '#FC2222';
//    } else if (!toggleShowOwe && sumOfToBePaidCosts > 0) {
//      color = '#3A82F6';
//    }

    return(
        <TouchableOpacity
        style={styles.oweToggleButton}
        onPress={() => {setToggleShowOwe(!toggleShowOwe);
        }}>
            <Text style={[styles.toggleOweButtonText,{color}]}>{toggleShowOwe ? "Display Toggle: Owe" : "Display Toggle: Owed"}</Text>
        </TouchableOpacity>
    );

  }

  console.log(
    '-----------------------------------------------------------------------------------',
  );
  return (
    <View style={styles.dashboardStyles.container}>
      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => setHelpModalVisible(true)}>
        <Text style={styles.helpButtonText}>i</Text>
      </TouchableOpacity>

      <OweToggleButton/>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isHelpModalVisible}
        onRequestClose={() => {
          setHelpModalVisible(!isHelpModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              1. The Score is an indicator on the Credibility of Household
              members
            </Text>
            <Text style={styles.modalText}>
              2. Press Create New Bill button to create new bills
            </Text>
            <Text style={styles.modalText}>
              3. Press Refresh button after changes are made
            </Text>
            <Text style={styles.modalText}>
              4. Use the Bottom Navigation Bar to move between different
              functions
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setHelpModalVisible(!isHelpModalVisible)}>
                <Text style={styles.textStyle}>Hide Help</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setHelpModalVisible(false);
                  setContactModalVisible(true);
                }}>
                <Text style={styles.textStyle}>Contact Us</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isContactModalVisible}
        onRequestClose={() => {
          setContactModalVisible(!isContactModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              For inquiries, complaints, bugs, suggestions, please email us at:
            </Text>
            <Text style={styles.modalText}>yunfei.pei@uq.com</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setContactModalVisible(!isContactModalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>



      <View style={styles.dashboardStyles.summaryContainer}>
        <DashboardSummaryTop toggleShowOwe={toggleShowOwe} />

        <View style={styles.dashboardStyles.summaryMiddle}>
          <View style={styles.dashboardStyles.summaryCreditScore}>
            <AnimatedCircularProgress
              size={deviceWidth * 0.45}
              width={15}
              fill={creditScore(currentUserScore)}
              //counterClockwise = {true};
              duration={0}
              rotation={0}
              tintColor={progressbarColor(0, currentUserID)}
              //onAnimationComplete={() => console.log('Finished user circular progress animation.')}
              backgroundColor={progressbarColor(1, currentUserID)}>
              {() => (
                <>
                  <ProgressbarText user={currentUserID} />
                  <Text style={styles.dashboardStyles.creditScoreOverdueText}>
                    {currentUserOverduePayments}{' '}
                    {currentUserOverduePayments == 1 ? 'payment' : 'payments'}{' '}
                    overdue
                  </Text>
                </>
              )}
            </AnimatedCircularProgress>
          </View>

          <DashboardSummaryCategories />
        </View>

        <DashboardSummaryBottom />
      </View>

      <View style={styles.dashboardStyles.housematesContainer}>
        <Text style={styles.dashboardStyles.housemateTitle}>
          Your household:{' '}
        </Text>
        <View style={styles.dashboardStyles.housemateScrollViewContainer}>
          <DashboardHousemateScores />
        </View>
      </View>

      <View style={styles.dashboardStyles.buttonContainer}>
        <TouchableOpacity
          style={styles.dashboardStyles.refreshButton}
          onPress={() => navigation.navigate('My Bills')}>
          <Text style={styles.dashboardStyles.createBillText}>
            Tick off bills
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dashboardStyles.createBillButton}
          onPress={() => navigation.navigate(NewBill)}>
          <Text style={styles.dashboardStyles.createBillText}>
            Create new bill
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

