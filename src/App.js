import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Public from './containers/Public';
import Login from './containers/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  const jwt = useSelector(state => state.user.jwt);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Public} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
