import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Header from '../components/Header';

const Tab = createBottomTabNavigator();

export default function App() {
    const routeIcons = {
        'Login': 'key',
        'Register': 'person-add',
    }

    return (
        <Tab.Navigator initialRouteName="Login" screenOptions={({ route }) => ({
            headerTitleAlign: 'left',
            headerTitleStyle: { fontWeight: 'bold', color: '#eee', fontSize: 20 },
            headerStyle: { height: 70, backgroundColor: '#3c71b6', paddingBottom: 10 },
            tabBarIcon: ({ focused, color, size }) => {
                return <Ionicons name={routeIcons[route.name]} size={size} color={color} />
            }
        })}
        >
            <Tab.Screen name="Login" component={Login} options={(props) => Header(props)} />
            <Tab.Screen name="Register" component={Register} options={(props) => Header(props)} />
        </Tab.Navigator>
    );
}
