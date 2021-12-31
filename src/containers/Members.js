import React, { useEffect, useState } from 'react';
import { loadMembers } from '../api';
import { View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

export default () => {
    const [members, setMembers] = useState([]);
    const [membersForDisplay, setMembersForDisplay] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const members = await loadMembers();
        setMembers(members);
        setMembersForDisplay(members)
    }

    return (
        <View>
            {membersForDisplay.map((member, idx) => (
                <ListItem key={`member${idx}`} bottomDivider>
                    <Avatar source={{ uri: "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" }} />
                    <ListItem.Content>
                        <ListItem.Title>{member.fullName}</ListItem.Title>
                        <ListItem.Subtitle>{`${member.email} - Trips: ${member?.trips?.length}`}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            ))}
        </View>
    )
}