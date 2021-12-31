import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Public from './containers/Public';
import Login from './containers/Login';
import Members from './containers/Members';
import Trips from './containers/Trips';
import Register from './containers/Register';
import Stats from './containers/Stats';

const Tab = createBottomTabNavigator();

export default function App() {
  const isAuth = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null);
  const routeIcons = {
    'Login': 'key',
    'Register': 'person-add',
    'Home': 'home',
    'Members': 'people',
    'Trips': 'paper-plane',
    'Stats': 'analytics',
    'AddTrip': 'add-circle-outline'
  }

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Login" screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold', color: '#eee' },
        headerStyle: { height: 70, backgroundColor: '#3c71b6' },
        tabBarIcon: ({ focused, color, size }) => {
          return <Ionicons name={routeIcons[route.name]} size={size} color={color} />
        }
      })}
      >
        {!isAuth ? (
          <>
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="Register" component={Register} />
          </>
        ) : null}
        <Tab.Screen name="Home" component={Public} />
        <Tab.Screen name="Members" component={Members} />
        <Tab.Screen name="Trips" component={Trips} />
        <Tab.Screen name="Stats" component={Stats} />
        <Tab.Screen name="AddTrip" component={Stats} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
