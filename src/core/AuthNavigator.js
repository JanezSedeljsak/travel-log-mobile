import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native';
import Login from '../containers/Login';
import Register from '../containers/Register';

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
        'Login': 'key',
        'Register': 'person-add',
    }

    return (
        <Tab.Navigator initialRouteName="Login" screenOptions={({ route }) => ({
            headerTitleAlign: 'left',
            headerTitleStyle: { fontWeight: 'bold', color: '#eee', fontSize: 18 },
            headerStyle: { height: 70, backgroundColor: '#3c71b6' },
            tabBarIcon: ({ focused, color, size }) => {
                return <Ionicons name={routeIcons[route.name]} size={size} color={color} />
            }
        })}
        >
            <Tab.Screen name="Login" component={Login} options={(props) => headerWithIcon(props)} />
            <Tab.Screen name="Register" component={Register} options={(props) => headerWithIcon(props)} />
        </Tab.Navigator>
    );
}
