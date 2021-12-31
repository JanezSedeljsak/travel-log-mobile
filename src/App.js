import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Public from './containers/Public';
import Login from './containers/Login';
import Members from './containers/Members';
import Trips from './containers/Trips';

const Stack = createNativeStackNavigator();

export default function App() {
  const isAuth = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Members" screenOptions={props => ({
        headerTitleAlign: 'center',
        headerStyle: { shadowColor: 'transparent', height: 70 },
      })}
      >
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen name="Home" component={Public} />
        <Stack.Screen name="Members" component={Members} />
        <Stack.Screen name="Trips" component={Trips} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
