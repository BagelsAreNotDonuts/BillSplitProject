import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './screens/Dashboard';
import History from './screens/History';
import Household from './screens/Household';
import BottomNavBar from './components/BottomNavBar';
import Fetch from './screens/FetchDemo';
import PushData from './screens/InsertDemo';

const Stack = createStackNavigator();

function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Household" component={Household} />
        <Stack.Screen name="FetchDemo" component={Fetch} />
        <Stack.Screen name="InsertDemo" component={PushData} />
      </Stack.Navigator>
      <BottomNavBar />
    </NavigationContainer>
  );
}

export default App;