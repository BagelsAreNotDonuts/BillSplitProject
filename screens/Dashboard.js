// screens/Home.js
import React from 'react';
import { View, Button, StyleSheet, Dimensions, TouchableOpacity,Text} from 'react-native';
import {colors, styles, colorScheme, deviceWidth, deviceHeight} from '../data/themes';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function Dashboard() {

    var testScore = 4;

    //Turns the credit score into a percentage to be used for the fill in the progress bar
    var creditScore = (score) => (score/5)*100;

    //Returns a hex color code depending on the score
    //The variant parameter determines what opacity is used, 0 for fully opaque, 1 for ?? opacity.
    var progressbarColor = (score,variant) => {
        var colorVariant = (variant !== 0 && variant !== 1) ? 0 : variant;
        switch (score) {
            case 5:
              return colorVariant==0 ? '#3A82F6': 'rgba(58, 130, 246, 0.5)'; // Blue
            case 4:
              return colorVariant==0 ? '#61BF73' : 'rgba(97, 191, 115, 0.1)'; // Green
            case 3:
              return "#3A7244" // Light green
            case 2:
              return '#FFEE58'; // Yellow
            case 1:
              return '#FF9B17'; // Amber
            case 9:
              return '#FC2222'; // Red
            default:
              return '#000000'; // Default to black or another color of your choice
          }

    };

    function ProgressbarText({score}) {
        var color = progressbarColor(score);

        return(
        <Text style={[{color}]}>
            {score}
        </Text>
        );
    };

    return (
        <View style={styles.dashboardStyles.container}>

            <View style = {styles.dashboardStyles.firstSection}>
                <AnimatedCircularProgress
                  size={120}
                  width={10}
                  fill={creditScore(testScore)}
                  rotation={0}
                  tintColor={progressbarColor(testScore,0)}
                  onAnimationComplete={() => console.log('onAnimationComplete')}
                  backgroundColor={progressbarColor(testScore,1)}>
                  {(fill) => (
                        <>
                            <ProgressbarText score={testScore}/>
                            <Text>
                              Auuughhhh
                            </Text>
                        </>
                      )}
                </AnimatedCircularProgress>
            </View>
            <View style = {styles.dashboardStyles.secondSection}>
                <View></View>
               </View>

        </View>
    );
}
