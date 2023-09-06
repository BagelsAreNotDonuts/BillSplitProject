// screens/Home.js
import React from 'react';
import { View, Button, StyleSheet, Dimensions, TouchableOpacity,Text} from 'react-native';
import {colors, styles, colorScheme, deviceWidth, deviceHeight} from '../data/themes';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useState, useEffect } from "react";


console.log(deviceWidth + "TestPoop");

export default function Dashboard() {

     const [userCreditScoreData, setUserCreditScoreData] = useState([]);

    //Gets the user's credit score (gets the credit score with ID 1, we don't have a login system yet obviously)
     async function getUserCreditScore() {
        try {
        console.log("trying")
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
            console.log(result);
            console.log("done");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
     };

    //Loads the credit score into the usestate, etc
    useEffect(() => {
        getUserCreditScore();
    },[]);

    //Sets the user's credit score to the info drawn from the database, defaults to 5.
    var testScore = typeof userCreditScoreData === "undefined" ? 5 : userCreditScoreData[0].score;
    console.log(userCreditScoreData[0].score);

    //Will be the variable counting the user's overdue payments.
    var testOverduePayment = 1;

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

    function ProgressbarText({score}) {
        var color = progressbarColor(score);

        return(
        //Inline style for this because I can't be bothered to put it into themes.
        //Displays the credit score number fixed to one decimal point score. {testOverduePayment} payment overdue
        <Text style={[styles.dashboardStyles.creditScoreText, {color}]}>
            {score.toFixed(1)}
        </Text>
        );
    };

    return (
        <View style={styles.dashboardStyles.container}>

            <View style = {styles.dashboardStyles.summaryContainer}>
                <View style = {styles.dashboardStyles.summaryTop}>
                </View>

                <View style = {styles.dashboardStyles.summaryMiddle}>

                    <View style = {styles.dashboardStyles.summaryCreditScore}>
                        <AnimatedCircularProgress
                        size={deviceWidth*0.4}
                        width={13}
                        fill={creditScore(testScore)}
                        rotation={0}
                        tintColor={progressbarColor(testScore,0)}
                        onAnimationComplete={() => console.log('onAnimationComplete')}
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

                    <View style = {styles.dashboardStyles.summaryCategories}>
                    </View>
                </View>

                <View style = {styles.dashboardStyles.summaryBottom}>
                </View>

            </View>


            <View style = {styles.dashboardStyles.housematesContainer}>
                <View></View>
               </View>

        </View>
    );
}
