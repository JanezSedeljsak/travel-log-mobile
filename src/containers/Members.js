import React, { useEffect, useState } from 'react';
import { loadMembers } from '../api';
import { View, ScrollView } from 'react-native';
import { ListItem, Avatar, Input } from 'react-native-elements';
import { useDebouncedCallback } from 'use-debounce';

export default () => {
    const [members, setMembers] = useState([]);
    const [membersForDisplay, setMembersForDisplay] = useState([]);
    const debounced = useDebouncedCallback(val => changeFilterText(val), 500);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const members = await loadMembers();
        setMembers(members);
        setMembersForDisplay(members)
    }

    function changeFilterText(value) {
        setMembersForDisplay(members.filter(member => member.fullName.toLowerCase().includes(value.toLowerCase())));
    }

    return (
        <View>
            <Input
                placeholder='Search by title'
                leftIcon={{ type: 'font-awesome', name: 'search' }}
                onChangeText={debounced}
            />
            <ScrollView>
                {membersForDisplay.map((member, idx) => (
                    <ListItem key={`member${idx}`} bottomDivider containerStyle={{ backgroundColor:"transparent" }}>
                        <Avatar source={{ uri: "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" }} />
                        <ListItem.Content>
                            <ListItem.Title>{member.fullName}</ListItem.Title>
                            <ListItem.Subtitle>{`${member.email} - Trips: ${member?.trips?.length}`}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        </View>
    )
}