import { StatusBar } from 'expo-status-bar';
import {  StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './../../screens/ManageExpense';
import RecentExpenses from './../../screens/RecentExpenses';
import AllExpenses from './../../screens/AllExpenses';
import { GlobalStyles  } from './../../constants/Colors';
import IconButton  from './../../components/UI/IconButton';
import ExpenseContextProvider from './../../store/expense-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      headerTintColor: 'white',
      tabBarStyle: { 
        backgroundColor: GlobalStyles.colors.primary500, 
      },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({tintColor}) => 
      <IconButton 
        icon='add' 
        size={24} 
        color={tintColor} 
        onPress={() => {navigation.navigate('ManageExpense')}}/>
    })}>
      <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({color, size}) => (
        <Ionicons name="hourglass" size={size} color={color}/>
      )
      }}/>
      <BottomTabs.Screen name="AllExpenses" component={AllExpenses} options={{
        title: 'All Expenses',
        tabBarLabel: 'All Recent',
        tabBarIcon: ({color, size}) => (
        <Ionicons name="calendar" size={size} color={color}/>
      )
      }}/>
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <ExpenseContextProvider>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={() => ({
          headerStyle: {backgroundColor: GlobalStyles.colors.primary500, headerTintColor: 'white'}
        })}>
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} />
          <Stack.Screen name="ManageExpense" component={ManageExpense} options={{  presentation: 'modal' }}/>
        </Stack.Navigator>
    </ExpenseContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 18,
    color: 'pink'
  }
});
