//Imports for styles, dimensions and appearance.
import {StyleSheet, Dimensions, Appearance, useColorScheme} from "react-native";
//Sets accessible constants for the device's dimensions.
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

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
        paddingVertical: 17,
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
        width: 40,
        height: 40,
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
        summaryContainer: {
          backgroundColor: '#131313', // Set the background color here
          padding: 10,
          marginTop:"5%",
          borderRadius: 10,
          alignItems: 'center',
          flex: 0.52,
          width: "90%",
          flexDirection: "column",
          //borderWidth: 1,
          //borderColor: "red",

          },
        summaryTop: {
            //borderWidth: 1,
            //borderColor: "red",
            flex: 0.22,
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"center",

        },
        costSummaryText: {
            width: "100%",
            fontWeight: 500,
            fontSize: deviceWidth*0.06,
            //color:"#FC2222",
            textAlign:"center",
            //borderWidth: 1,
            //borderColor: "red",
            height: "55%",
            textAlignVertical: "top",
            includeFontPadding:false,
        },
        costSummaryHeader: {
            width: "100%",
            fontWeight: 500,
            fontSize: deviceWidth*0.042,
            color:"#8E8E8E",
            textAlign:"center",
            //borderWidth: 1,
            //borderColor: "green",
            height: "45%",
            includeFontPadding:false,
            textAlignVertical:"bottom"
        },
        summaryMiddle: {
            //borderWidth: 1,
            //borderColor: "pink",
            width: "100%",
            flex: 0.65,
            flexDirection: "row",
            justifyContent: "center"
        },
        summaryCreditScore: {
            //borderWidth: 1,
            //borderColor: "blue",
            flex: 0.6,
            height: "100%",
            justifyContent:"center",
            alignItems:"center",
        },
        creditScoreText: {
            fontSize: deviceWidth*0.14,
            height: deviceWidth*0.14,
            fontWeight: 400,
            //borderWidth: 1,
            //borderColor: "blue",
            alignItems: "center",
            justifyContent: "center",
            includeFontPadding: false,

        },
        creditScoreOverdueText: {
            width: "55%",
            //borderWidth: 1,
            //borderColor: "blue",
            fontWeight: 500,
            textAlign: "center",
            fontSize: deviceWidth*0.036,

        },
        summaryCategories: {
            //borderWidth: 1,
            //borderColor: "green",
            flex: 0.4,
            height: "100%",
            flexDirection: "column",
        },
        summaryCategoriesFoodContainer: {
            flex: 0.3333,
            width: "100%",
            //borderWidth: 1,
            //borderColor: "red",
        },
        summaryCategoriesRentContainer: {
            flex: 0.3333,
            width: "100%",
            //borderWidth: 1,
            //borderColor: "red",
        },
        summaryCategoriesOtherContainer: {
            flex: 0.3333,
            width: "100%",
            //borderWidth: 1,
            //borderColor: "yellow",
        },
        summaryBottom: {
            //borderWidth: 1,
            //borderColor: "yellow",
            flex: 0.1,
            width: "100%",
            alignItems: "center",
        },
        buttonText: {
            color: 'white', // Set the text color here
            fontWeight: 'bold',

          },
        viewBillsButton: {
            width: "32%",
            height: "100%",
            //borderWidth: 1,
            //borderColor: "blue",
            alignItems: "center",
            justifyContent: "flex-end"

        },
        viewBillsButtonText: {
            width: "100%",
            fontWeight: 500,
            fontSize: deviceWidth*0.036,
            color:"#3A82F6",
            textAlign:"center",
        },
        categoriesHeaderText: {
            width: "100%",
            fontWeight: 500,
            fontSize: deviceWidth*0.042,
            color:"#8E8E8E",
            textAlign:"center",
            //borderWidth: 1,
            //borderColor: "blue",
            height: "30%",
            includeFontPadding:false
        },
        categoriesCostText: {
            width: "100%",
            fontWeight: 500,
            fontSize: deviceWidth*0.06,
            //color:"#FC2222",
            textAlign:"center",
            //borderWidth: 1,
            //borderColor: "blue",
            height: "70%",
            textAlignVertical: "top",
            includeFontPadding:false
        },
        housematesContainer: {
            backgroundColor: '#131313', // Set the background color here
            padding: 10,
            marginTop:"5%",
            borderRadius: 10,
            alignItems: 'center',
            flex: 0.29,
            width: "90%",
            //borderWidth: 1,
            //borderColor: "green",
        },
        housemateCreditScoreText: {
            flex: 1,
            justifyContent: "center",
            textAlign: "center",
            textAlignVertical: "center",
            fontSize: deviceWidth*0.09,


        },
        housemateTitle: {
            width: "100%",
            flex: 0.17,
            color: "#8E8E8E",
            //borderWidth: 1,
            //borderColor: "white",
            textAlign: "center",
            fontSize: deviceWidth*0.036,
            fontWeight: 500
        },
        housemateCircularProgressBox: {
            //borderWidth: 1,
            //borderColor: "yellow",
            flex: 1,
            height: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
        },
        housemateScrollView: {
            //borderWidth: 1,
            //borderColor: "red",
            width: "100%",

        },
        housemateScrollViewContainer: {
            flex: 0.85,
            width: "100%",
            //borderWidth: 1,
            //borderColor: "purple"
        },
        housemateNames: {
            flex: 0.4,
            width: "100%",
            //borderWidth: 1,
            //borderColor: "red",
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: deviceWidth*0.036,
        },
        buttonContainer: {
            marginTop:"10%",
            flex: 0.16,
            //borderWidth: 1,
            //borderColor: "red",
            width: "90%",
            flexDirection: "row",
            justifyContent: "space-between",
        },
        createBillButton: {
            flex: 0.46,
            height: "60%",
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 18,
            borderColor: '#3A82F6',
            borderWidth: 2,
            backgroundColor: 'black',
        },
        refreshButton: {
            flex: 0.46,
            height: "60%",
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 18,
            borderColor: '#3A82F6',
            borderWidth: 2,
            backgroundColor: 'black',
        },
        createBillText: {
            color: '#3A82F6',
            fontSize: 18,
          },
    },

});



