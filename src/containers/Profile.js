import React, { useEffect, useState } from 'react'
import { loadProfile } from '../api';
import { useSelector } from 'react-redux'
import { View, Text } from 'react-native';
import moment from 'moment';


function LabelWithValue({ label, value }) {
    return (
        <Text style={{ fontSize: 18 }}>
            {`${label}: `}
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{value}</Text>
        </Text>
    )
}

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

    if (!Object.keys(profileData).length) {
        return <View stlye={{ flex: 1 }}></View>;
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', margin: 15 }}>
            <LabelWithValue label={"Full name"} value={profileData.email} />
            <LabelWithValue label={"Email"} value={profileData.fullname} />
            <LabelWithValue label={"Birthdate"} value={moment(profileData.birthDate).format("DD.MM.yyyy")} />
            <LabelWithValue label={"Member since"} value={moment(profileData.createdAt).format("DD.MM.yyyy")} />
            <LabelWithValue label={"Lang code"} value={profileData.langCode} />
        </View>
    )
}