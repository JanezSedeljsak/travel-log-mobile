import React, { useEffect, useState } from 'react';
import { loadMostActiveuMembers, loadTopDestinations } from '../api';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ListItem, Avatar } from 'react-native-elements';

function BottomNav() {
    const Tab = createBottomTabNavigator();

    return <></>;
    /*return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );*/
}

export default () => {
    const [topMembers, setTopMembers] = useState([]);
    const [topLocations, setTopLocations] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setTopMembers(await loadMostActiveuMembers());
        setTopLocations(await loadTopDestinations());
    }

    return (
        <View>
            {
                topMembers.map((member, idx) => (
                    <ListItem key={`member${idx}`} bottomDivider>
                        <Avatar source={{ uri: "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" }} />
                        <ListItem.Content>
                            <ListItem.Title>{member.user.fullname}</ListItem.Title>
                            <ListItem.Subtitle>{`${member.user.email} - Trips: ${member.count}`}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    )
}