import React, { useEffect, useState } from 'react'
import { loadProfile } from '../api';
import { useSelector } from 'react-redux'
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default () => {
    const jwt = useSelector(state => state.user.jwt);
    const [profileData, setProfileData] = useState({});
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const profileData = await loadProfile(jwt);
        console.log(profileData);
        setProfileData(profileData);
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Input
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                onChangeText={() => {}}
            />
        </View>
    )
}