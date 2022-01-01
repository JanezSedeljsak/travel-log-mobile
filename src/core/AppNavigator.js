import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Members from '../containers/Members';
import Trips from '../containers/Trips';
import Stats from '../containers/Stats';
import TripFrom from '../containers/TripForm';
import Profile from '../containers/Profile';
import Header from '../components/Header';

const Tab = createBottomTabNavigator();

export default function App() {
    const isAuth = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null);
    const routeIcons = {
        'Members': 'people',
        'Trips': 'paper-plane',
        'Stats': 'analytics',
        'AddTrip': 'add-circle-outline',
        'Profile': 'person'
    }

    return (
        <Tab.Navigator initialRouteName="Trips"
            screenOptions={({ route }) => ({
                headerTitleAlign: 'left',
                headerTitleStyle: { fontWeight: 'bold', color: '#eee', fontSize: 20 },
                headerStyle: { height: 70, backgroundColor: '#3c71b6', paddingBottom: 10 },
                tabBarIcon: ({ focused, color, size }) => {
                    return <Ionicons name={routeIcons[route.name]} size={size} color={color} />
                },
            })}
        >
            <Tab.Screen name="Trips" component={Trips} options={(props) => Header(props)} />
            <Tab.Screen name="Members" component={Members} options={(props) => Header(props)} />
            <Tab.Screen name="Stats" component={Stats} options={(props) => Header(props)} />
            {isAuth && <Tab.Screen name="AddTrip" component={TripFrom} options={(props) => Header(props)} />}
            {isAuth && <Tab.Screen name="Profile" component={Profile} options={(props) => Header(props)} />}
        </Tab.Navigator>
    );
}
