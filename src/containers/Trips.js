import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { ListItem, Avatar, Input, Button } from 'react-native-elements';
import { Modal, Portal, Provider } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';
import GestureRecognizer from 'react-native-swipe-gestures';
import LabelWithValue from '../components/LabelWithValue';
import { useSelector } from 'react-redux';
import { loadTrips } from '../api';
import moment from 'moment';

export default () => {
    const usrEmail = useSelector(state => state.user.email);
    const debounced = useDebouncedCallback(val => changeFilterText(val), 500);

    const [trips, setTrips] = useState([]);
    const [tripsForDisplay, setTripsForDisplay] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [viewAllTrips, setViewAllTrips] = useState(true);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailIndex, setDetailIndex] = useState(-1);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const trips = await loadTrips();
        setTrips(trips);
        setTripsForDisplay(trips)
    }

    function closeModal() {
        setShowDetailModal(false);
        setDetailIndex(-1);
    }

    function openDetailmodal(idx) {
        setDetailIndex(idx);
        setShowDetailModal(true);
    }

    function detailModal() {
        if (detailIndex == -1) return <View></View>;
        const trip = tripsForDisplay[detailIndex];
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
                    <LabelWithValue label="Name" value={trip.tripName} />
                    <LabelWithValue label="Destination" value={trip.destination} />
                    <LabelWithValue label="Country" value={trip.countryName} />
                    <LabelWithValue label="Trip date" value={moment(trip.tripDate).format("DD.MM.yyyy")} />

                    <ScrollView>
                        {trip.userList.map((member, idx) => (
                            <ListItem key={`member${idx}`} bottomDivider containerStyle={{ backgroundColor: "transparent" }}>
                                <Avatar source={{ uri: "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" }} />
                                <ListItem.Content>
                                    <ListItem.Title>{member.fullName}</ListItem.Title>
                                    <ListItem.Subtitle>{`${member.email} - Trips: ${member?.trips?.length}`}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                    </ScrollView>
                </Modal>
            </GestureRecognizer>
        )
    }

    function updateVisibleTrips(filtrTxt, viewTrips) {
        const tmpTrips = trips.filter(trip => {
            const containsFilterTxt = trip.tripName.toLowerCase().includes(filtrTxt.toLowerCase());
            const showTrip = !usrEmail || (viewTrips || trip.userList.some(user => user.email === usrEmail));
            return containsFilterTxt && showTrip;
        });

        setTripsForDisplay(tmpTrips);
    }

    function changeFilterText(val) {
        setFilterText(val);
        updateVisibleTrips(val, viewAllTrips);
    }

    function changeViewAllTrips(val) {
        setViewAllTrips(val);
        updateVisibleTrips(filterText, val);
    }

    return (
        <Provider>
            <View>
                <Input
                    placeholder='Search by title'
                    leftIcon={{ type: 'font-awesome', name: 'search' }}
                    onChangeText={debounced}
                />
                {usrEmail ? <Button
                    title={viewAllTrips ? "My trips only" : "Show all trips"}
                    buttonStyle={{
                        backgroundColor: '#3c71b6',
                        borderRadius: 5,
                    }}
                    titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
                    containerStyle={{
                        height: 40,
                        width: '90%',
                        marginHorizontal: '5%',
                        marginVertical: 10,
                    }}
                    onPress={() => changeViewAllTrips(!viewAllTrips)}
                /> : null}
                <ScrollView>
                    {tripsForDisplay.map((trip, idx) => (
                        <ListItem key={`trip${idx}`} onPress={() => openDetailmodal(idx)} bottomDivider containerStyle={{ backgroundColor: "transparent" }}>
                            <Avatar source={{ uri: "https://cdn-icons-png.flaticon.com/512/1452/1452378.png" }} />
                            <ListItem.Content>
                                <ListItem.Title>{trip.tripName}</ListItem.Title>
                                <ListItem.Subtitle>{`${trip.destination} - ${moment(trip.tripDate, "YYYYMMDD").fromNow()}`}</ListItem.Subtitle>
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