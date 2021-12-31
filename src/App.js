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
    'Login': 'home',
    'Register': 'home',
    'Home': 'home',
    'Members': 'home',
    'Trips': 'home',
    'Stats': 'home'
  }

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Login" screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        headerStyle: { shadowColor: 'transparent', height: 70 },
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
      </Tab.Navigator>
    </NavigationContainer>
  );
}
