import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from '../containers/Login';
import Register from '../containers/Register';

const Tab = createBottomTabNavigator();

export default function App() {
    const isAuth = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null);
    const routeIcons = {
        'Login': 'key',
        'Register': 'person-add',
    }

    return (
            <Tab.Navigator initialRouteName="Login" screenOptions={({ route }) => ({
                headerTitleAlign: 'center',
                headerTitleStyle: { fontWeight: 'bold', color: '#eee' },
                headerStyle: { height: 70, backgroundColor: '#3c71b6' },
                tabBarIcon: ({ focused, color, size }) => {
                    return <Ionicons name={routeIcons[route.name]} size={size} color={color} />
                }
            })}
            >
                <Tab.Screen name="Login" component={Login} />
                <Tab.Screen name="Register" component={Register} />
            </Tab.Navigator>
    );
}
