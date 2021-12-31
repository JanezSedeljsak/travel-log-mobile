import React, { useEffect, useState } from 'react';
import { loadMostActiveuMembers, loadTopDestinations } from '../api';
import { View, Text } from 'react-native';

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
            <Text>public</Text>
        </View>

    )
}