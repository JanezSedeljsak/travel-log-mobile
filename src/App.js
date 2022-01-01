import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Public from './containers/Public';
import AppNavigator from './core/AppNavigator';
import AuthNavigator from './core/AuthNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={props => ({
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold', color: '#eee' },
        headerStyle: { height: 70, backgroundColor: '#3c71b6' }
      })}>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Public} />
        <Stack.Screen options={{ headerShown: false }} name="Auth" component={AuthNavigator} />
        <Stack.Screen options={{ headerShown: false }} name="Browse" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
