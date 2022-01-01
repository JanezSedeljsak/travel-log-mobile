import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { ListItem, Avatar, Input } from 'react-native-elements';
import { Modal, Portal, Provider } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';
import GestureRecognizer from 'react-native-swipe-gestures';
import LabelWithValue from '../components/LabelWithValue';
import { loadMembers } from '../api';
import moment from 'moment';

export default () => {
    const [members, setMembers] = useState([]);
    const [membersForDisplay, setMembersForDisplay] = useState([]);
    const debounced = useDebouncedCallback(val => changeFilterText(val), 500);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailIndex, setDetailIndex] = useState(-1);

    useEffect(() => {
        fetchData();
    }, []);

    function closeModal() {
        setShowDetailModal(false);
        setDetailIndex(-1);
    }

    function detailModal() {
        if (detailIndex == -1) return <View></View>;
        const member = membersForDisplay[detailIndex];
        return (
            <GestureRecognizer
                style={{ flex: 1 }}
                onSwipeRight={closeModal}
            >
                <Modal visible={showDetailModal} onDismiss={closeModal} contentContainerStyle={{
                    backgroundColor: 'white',
                    padding: 10,
                    height: '100%'
                }}>
                    <LabelWithValue label="Full name" value={member.fullName} />
                    <LabelWithValue label="Email" value={member.email} />
                    <LabelWithValue label="Birthdate" value={moment(member.birthdate).format("DD.MM.yyyy")} />
                    <LabelWithValue label="Joined" value={moment(member.createdAt).format("DD.MM.yyyy")} />
                    <ScrollView>
                        {member.trips.map((trip, idx) => (
                            <ListItem key={`trip${idx}`} bottomDivider containerStyle={{ backgroundColor: "transparent" }}>
                                <Avatar source={{ uri: "https://cdn-icons-png.flaticon.com/512/1452/1452378.png" }} />
                                <ListItem.Content>
                                    <ListItem.Title>{trip.tripName}</ListItem.Title>
                                    <ListItem.Subtitle>{`${trip.destination} - ${moment(trip.tripDate, "YYYYMMDD").fromNow()}`}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                    </ScrollView>
                </Modal>
            </GestureRecognizer>
        )
    }

    async function fetchData() {
        const members = await loadMembers();
        setMembers(members);
        setMembersForDisplay(members)
    }

    function changeFilterText(value) {
        setMembersForDisplay(members.filter(member => member.fullName.toLowerCase().includes(value.toLowerCase())));
    }

    function openDetailmodal(idx) {
        setDetailIndex(idx);
        setShowDetailModal(true);
    }

    return (
        <Provider>
            <View>
                <Input
                    placeholder='Search by title'
                    leftIcon={{ type: 'font-awesome', name: 'search' }}
                    onChangeText={debounced}
                />
                <ScrollView>
                    {membersForDisplay.map((member, idx) => (
                        <ListItem key={`member${idx}`} onPress={() => openDetailmodal(idx)} bottomDivider containerStyle={{ backgroundColor: "transparent" }}>
                            <Avatar source={{ uri: "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" }} />
                            <ListItem.Content>
                                <ListItem.Title>{member.fullName}</ListItem.Title>
                                <ListItem.Subtitle>{`${member.email} - Trips: ${member?.trips?.length}`}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </ScrollView>
                <Portal>
                    {detailModal()}
                </Portal>
            </View>
        </Provider>
    )
}