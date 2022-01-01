import React from 'react';
import { Platform, Text, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Members from '../containers/Members';
import Trips from '../containers/Trips';
import Stats from '../containers/Stats';
import TripFrom from '../containers/TripForm';

const Tab = createBottomTabNavigator();

function headerWithIcon({ navigation }) {
    return {
        headerTitle: props => <Text {...props} />,
        headerRight: () => (
            <Ionicons
                name={'arrow-undo'} size={25} color={'#eee'} style={{ marginHorizontal: 10 }}
                onPress={() => navigation.getParent()?.navigate('Home')}
            />
        ),
    }
}

export default function App() {
    const isAuth = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null);
    const routeIcons = {
        'Members': 'people',
        'Trips': 'paper-plane',
        'Stats': 'analytics',
        'AddTrip': 'add-circle-outline'
    }

    return (
        <Tab.Navigator initialRouteName="Trips"
            screenOptions={({ route }) => ({
                headerTitleAlign: 'left',
                headerTitleStyle: { fontWeight: 'bold', color: '#eee', fontSize: 18 },
                headerStyle: { height: 70, backgroundColor: '#3c71b6' },
                tabBarIcon: ({ focused, color, size }) => {
                    return <Ionicons name={routeIcons[route.name]} size={size} color={color} />
                },
            })}
        >
            <Tab.Screen name="Trips" component={Trips} options={(props) => headerWithIcon(props)} />
            <Tab.Screen name="Members" component={Members} options={(props) => headerWithIcon(props)} />
            <Tab.Screen name="Stats" component={Stats} options={(props) => headerWithIcon(props)} />
            <Tab.Screen name="AddTrip" component={TripFrom} options={(props) => headerWithIcon(props)} />
        </Tab.Navigator>
    );
}
