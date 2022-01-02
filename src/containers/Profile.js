import React, { useEffect, useState } from 'react'
import { loadProfile } from '../api';
import { useSelector } from 'react-redux'
import { View, ScrollView } from 'react-native';
import moment from 'moment';
import LabelWithValue from '../components/LabelWithValue';

export default () => {
    const jwt = useSelector(state => state.user.jwt);
    const [profileData, setProfileData] = useState({});
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const profileData = await loadProfile(jwt);
        setProfileData(profileData);
    }

    if (!Object.keys(profileData).length) {
        return <View stlye={{ flex: 1 }}></View>;
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', margin: '2.5%', width: '95%' }}>
            <ScrollView style={{ width: '100%' }}>
                <LabelWithValue label={"Full name"} value={profileData.email} />
                <LabelWithValue label={"Email"} value={profileData.fullname} />
                <LabelWithValue label={"Birthdate"} value={moment(new Date(profileData.birthdate)).format("DD.MM.yyyy")} />
                <LabelWithValue label={"Member since"} value={moment(new Date(profileData.createdAt)).format("DD.MM.yyyy")} />
                <LabelWithValue label={"Lang code"} value={profileData.langCode} />
            </ScrollView>
        </View>
    )
}