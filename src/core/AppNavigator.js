import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Members from '../containers/Members';
import Trips from '../containers/Trips';
import Stats from '../containers/Stats';
import TripFrom from '../containers/TripForm';

const Tab = createBottomTabNavigator();

export default function App() {
    const isAuth = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null);
    const routeIcons = {
        'Members': 'people',
        'Trips': 'paper-plane',
        'Stats': 'analytics',
        'AddTrip': 'add-circle-outline'
    }

    return (
        <Tab.Navigator initialRouteName="Trips" screenOptions={({ route }) => ({
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold', color: '#eee' },
            headerStyle: { height: 70, backgroundColor: '#3c71b6' },
            tabBarIcon: ({ focused, color, size }) => {
                return <Ionicons name={routeIcons[route.name]} size={size} color={color} />
            }
        })}
        >
            <Tab.Screen name="Trips" component={Trips} />
            <Tab.Screen name="Members" component={Members} />
            <Tab.Screen name="Stats" component={Stats} />
            <Tab.Screen name="AddTrip" component={TripFrom} />
        </Tab.Navigator>
    );
}
