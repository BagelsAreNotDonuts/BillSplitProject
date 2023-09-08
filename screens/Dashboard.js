// screens/Home.js
import React from 'react';
import { View, Button, StyleSheet, Dimensions, TouchableOpacity,Text, TouchableHighlight, ScrollView} from 'react-native';
import {colors, styles, colorScheme, deviceWidth, deviceHeight} from '../data/themes';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useState, useEffect } from "react";



//NOTE USE horizontal: true FOR SCROLL VIEW
export default function Dashboard() {
    //-------------------------------USE STATES && EFFECTS + FETCHES ---------------------------

    const [userCreditScoreData, setUserCreditScoreData] = useState([]);
    const [housemateCreditScoreData, setHousemateCreditScoreData] = useState([]);
    const [userRentBillData, setUserRentBillData] = useState([]);

    //Gets the user's credit score (gets the credit score with ID 1, we don't have a login system yet obviously)
     async function getUserCreditScore() {
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
                query: 'select score FROM CreditScore WHERE userID = 1'
            })
        });
            const result = await response.json();  // I'm using json() because text() makes it not work properly?
            setUserCreditScoreData(result);
        } catch (error) {
            console.error('Error fetching data for credit stuff:', error);
        }
     };

     //I should probably do all of this is one call, but right now I can't be bothered to change the code to match it, so I'm doing this.
     async function getHousemateCreditScores() {
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
                     query: 'select score FROM CreditScore WHERE userID != 1'
                 })
             });
                 const result = await response.json();  // I'm using json() because text() makes it not work properly?
                 setHousemateCreditScoreData(result);
             } catch (error) {
                 console.error('Error fetching data for housemate stuff:', error);
             }
          };
    async function getUserRentBillData() {
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
                 query: 'SELECT * FROM Bills WHERE userID = 1 AND billCat = \'Utilities\';'
             })
         });
             const result = await response.json();  // I'm using json() because text() makes it not work properly?
             setUserRentBillData(result);
         } catch (error) {
             console.error('Error fetching data for housemate stuff:', error);
         }

    };

    //Loads the credit score into the usestate, etc. To load data live add the required things to update based on into the [].
    useEffect(() => {
        getUserCreditScore();
        getUserRentBillData();
    },[]);

    //---------------------------------------------VARIABLES----------------------------------------

    //Sets the user's credit score to the info drawn from the database, defaults to 5.
    var testScore = typeof userCreditScoreData[0] !== "undefined" ? userCreditScoreData[0].score : 5;

    //Will be the variable counting the user's overdue payments.
    var testOverduePayment = 1;

    //Will be the variable to determine whether or not the user is toggling to show what they owe/are owed
    var toggleShowOwe = true;


    //Will be the variables that determines the amounts the user needs to pay/be paid.
    var testFoodCostToPay = 20;
    var testRentCostToPay = 0;
    //Goes through all the rent bills that need to be paid and sums them into the variable.
    var rentToPay = () => {
        var rentSum = 0;
        if (typeof userRentBillData[0] !== "undefined") {
            for (const element of userRentBillData) {
                rentSum += parseFloat(userRentBillData[element].totalCost);
            }
        }
        return rentSum;
    };
    var rentToPay = typeof userRentBillData[0] !== "undefined" ? parseFloat(userRentBillData[0].totalCost) : 0;
    var testOtherCostToPay = 0;
    var testFoodCostToBePaid = 69;
    var testRentCostToBePaid = 20;
    var testOtherCostToBePaid = 0;


    //Turns the credit score into a percentage to be used for the fill in the progress bar
    var creditScore = (score) => (score/5)*100;

    //Returns a hex color code depending on the score
    //The variant parameter determines what opacity is used, 0 for fully opaque, 1 for ?? opacity.
    var progressbarColor = (score,variant) => {
        var colorVariant = (variant !== 0 && variant !== 1) ? 0 : variant;
        switch (score) {
            case 5:
              return colorVariant==0 ? '#3A82F6': 'rgba(58, 130, 246, 0.1)'; // Blue
            case 4:
              return colorVariant==0 ? '#61BF73' : 'rgba(97, 191, 115, 0.1)'; // Green
            case 3:
              return colorVariant==0 ? "#B0D766" : 'rgba(176, 215, 102, 0.1)'// Weird yellow
            case 2:
              return colorVariant==0 ? '#FFEE58' : 'rgba(255, 238, 88, 0.1)'; // Yellow
            case 1:
              return colorVariant==0 ? '#FF9B17' : 'rgba(255, 155, 23, 0.1)'; // Amber
            case 0:
              return colorVariant==0 ? '#FC2222' : 'rgba(252, 34, 34, 0.1)'; // Red
            default:
              return '#000000'; // Default to black or another color of your choice
          }

    };

    //---------------------------------------------COMPONENTS---------------------------------------

    //Component for the progress bar's number
    function ProgressbarText({score}) {
        var color = progressbarColor(score);

        return(

        //Displays the credit score number fixed to one decimal point score. {testOverduePayment} payment overdue
        <Text style={[styles.dashboardStyles.creditScoreText, {color}]}>
            {score.toFixed(1)}
        </Text>
        );
    };

    //Component displaying the top segment of the summary section
    function DashboardSummaryTop({toggleShowOwe}) {

        var color = "white"
        //Sums up costs that user needs to pay
        var sumOfToPayCosts = testFoodCostToPay + rentToPay + testOtherCostToPay;

        //Sums up costs user needs to be paid
        var sumOfToBePaidCosts = testFoodCostToBePaid + testRentCostToBePaid + testOtherCostToBePaid;
        if (toggleShowOwe && sumOfToPayCosts > 0) {
            color = "#FC2222";
        } else if (sumOfToBePaidCosts > 0) {
            color = "#3A82F6";
        }

        return (
        <>
            <View style = {styles.dashboardStyles.summaryTop}>
                <Text style = {styles.dashboardStyles.costSummaryHeader}>{toggleShowOwe ? "You owe:" : "You're owed:"}</Text>
                 <Text style = {[styles.dashboardStyles.costSummaryText,{color}]}>
                ${toggleShowOwe ? sumOfToPayCosts.toFixed(2) : sumOfToBePaidCosts.toFixed(2)}</Text>
            </View>
        </>

        );
    };

    //Component displaying the bottom segment of the summary section
    function DashboardSummaryBottom() {
        return (
        <>
            <View style = {styles.dashboardStyles.summaryBottom}>
                <TouchableHighlight style = {styles.dashboardStyles.viewBillsButton} onPress={()=>{}}>
                    <Text style = {styles.dashboardStyles.viewBillsButtonText}> View my bills</Text>
                </TouchableHighlight>
            </View>
        </>

        );
    };

    //Component to display the money you're owed/owe for each category in the categories section
    //toggleShowOwe determines whether or not the user wants to see owe/owed, cost category to be paid/pay is the cost variable associated to the category you're displaying
    function CategoriesMoneyText({toggleShowOwe,costCategoryToBePaid,costCategoryToPay}) {

        var color = "white";
        //Changes the color depending on the user's toggling of the toggleShowOwe variable.
        if (!toggleShowOwe && (costCategoryToBePaid > 0)) {
            color = "#3A82F6";
        } else if (costCategoryToPay > 0) {
            color = "#FC2222";
        }
        return(
            <Text style = {[styles.dashboardStyles.categoriesCostText,{color}]}>
            {toggleShowOwe && costCategoryToPay > 0 ? "-$" : "$" }
            {toggleShowOwe ? costCategoryToPay.toFixed(2) : costCategoryToBePaid.toFixed(2)}</Text>
        );

    };

    //Component displaying the right segment of the summary section
    function DashboardSummaryCategories() {
        return (
        <>
            <View style = {styles.dashboardStyles.summaryCategories}>
                <View style = {styles.dashboardStyles.summaryCategoriesFoodContainer}>
                    <Text style = {styles.dashboardStyles.categoriesHeaderText}>Food</Text>
                    <CategoriesMoneyText toggleShowOwe={toggleShowOwe}
                    costCategoryToBePaid = {testFoodCostToBePaid} costCategoryToPay = {testFoodCostToPay}/>
                </View>
                <View style = {styles.dashboardStyles.summaryCategoriesRentContainer}>
                    <Text style = {styles.dashboardStyles.categoriesHeaderText}>Rent</Text>
                    <CategoriesMoneyText toggleShowOwe={toggleShowOwe}
                    costCategoryToBePaid = {testRentCostToBePaid} costCategoryToPay = {rentToPay}/>
                </View>
                <View style = {styles.dashboardStyles.summaryCategoriesOtherContainer}>
                    <Text style = {styles.dashboardStyles.categoriesHeaderText}>Other</Text>
                    <CategoriesMoneyText toggleShowOwe={toggleShowOwe}
                    costCategoryToBePaid = {testOtherCostToBePaid} costCategoryToPay = {testOtherCostToPay}/>
                </View>

            </View>
        </>

        );
    };

    //NOT IN USE RIGHT NOW, I THINK IT CAUSES TO PROGRESS BAR TO SPAM RENDER?
    function DashboardSummaryCreditScore() {
        return (

        <View style = {styles.dashboardStyles.summaryCreditScore}>
            <AnimatedCircularProgress
            size={deviceWidth*0.45}
            width={15}
            fill={creditScore(testScore)}
            rotation={0}
            tintColor={progressbarColor(testScore,0)}
            backgroundColor={progressbarColor(testScore,1)}>
            {() => (
                <>
                    <ProgressbarText score={testScore}/>
                    <Text style={styles.dashboardStyles.creditScoreOverdueText}>
                        ? payment overdue
                    </Text>
                </>
            )}
            </AnimatedCircularProgress>
        </View>

        );
    };

    return (
        <View style={styles.dashboardStyles.container}>
            <View style = {styles.dashboardStyles.summaryContainer}>
                <DashboardSummaryTop toggleShowOwe={toggleShowOwe}/>

                <View style = {styles.dashboardStyles.summaryMiddle}>

                <View style = {styles.dashboardStyles.summaryCreditScore}>
                    <AnimatedCircularProgress
                    size={deviceWidth*0.45}
                    width={15}
                    fill={creditScore(testScore)}
                    rotation={0}
                    tintColor={progressbarColor(testScore,0)}
                    onAnimationComplete={() => console.log('Finished user circular progress animation.')}
                    backgroundColor={progressbarColor(testScore,1)}>
                    {() => (
                        <>
                            <ProgressbarText score={testScore}/>
                            <Text style={styles.dashboardStyles.creditScoreOverdueText}>
                                ? payment overdue
                            </Text>
                        </>
                    )}
                    </AnimatedCircularProgress>
                </View>

                    <DashboardSummaryCategories/>

                </View>

                <DashboardSummaryBottom/>

            </View>


            <View style = {styles.dashboardStyles.housematesContainer}>
                <View>
                </View>
            </View>

        </View>
    );
}
