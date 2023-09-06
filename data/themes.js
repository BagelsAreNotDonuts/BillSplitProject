//Imports for styles, dimensions and appearance.
import {StyleSheet, Dimensions, Appearance, useColorScheme} from "react-native";
//Sets accessible constants for the device's dimensions.
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height;

//Gets color scheme to tell if light or dark mode
export const colorScheme = Appearance.getColorScheme();

//Colors used in the app.
export const colors = {
    iconGrey: "D0D0D0",
};
//Style sheet for everything
export const styles = StyleSheet.create({
    bottomNavbarStyles : {
        container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        },
        darkContainer: {
        backgroundColor: '#131313',
        },
        lightContainer: {
        backgroundColor: '#fff',
        },
        navItem: {
        alignItems: 'center',
        },
        icon: {
        width: 30,
        height: 30,
        },
        label: {
        fontSize: 14,
        },
        darkText: {
        color: '#fff',
        },
        lightText: {
        color: '#000',
        },
    },
    dashboardStyles: {
        container: {
          flex: 1,
          alignItems: 'center',
          backgroundColor: colorScheme == "dark" ? "#000000" : "#FFFFFF",
          flexDirection: "column",
          border: "solid red 2px",
        },
        firstSection: {
          backgroundColor: '#131313', // Set the background color here
          padding: 10,
          marginTop:"5%",
          borderRadius: 10,
          alignItems: 'center',
          flex: 0.50,
          width: "90%",

          },
          secondSection: {
                    backgroundColor: '#131313', // Set the background color here
                    padding: 10,
                    marginTop:"5%",
                    borderRadius: 10,
                    alignItems: 'center',
                    flex: 0.30,
                    width: "90%",
          },
        buttonText: {
            color: 'white', // Set the text color here
            fontWeight: 'bold',
          },
        navBar: {

        },
    },

});



