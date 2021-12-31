import React, { useEffect, useState } from 'react';
import { loadTrips } from '../api';
import moment from 'moment';
import { View, Text, ScrollView } from 'react-native';
import { ListItem, Avatar, Input, Button } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';

export default () => {
    const usrEmail = useSelector(state => state.user.email);
    const debounced = useDebouncedCallback(val => changeFilterText(val), 500);

    const [trips, setTrips] = useState([]);
    const [tripsForDisplay, setTripsForDisplay] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [viewAllTrips, setViewAllTrips] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const trips = await loadTrips();
        setTrips(trips);
        setTripsForDisplay(trips)
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
        <View>
            <Input
                placeholder='Search by title'
                leftIcon={{ type: 'font-awesome', name: 'search' }}
                onChangeText={debounced}
            />
            {usrEmail && <Button
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
            />}
            <ScrollView>
                {tripsForDisplay.map((trip, idx) => (
                    <ListItem key={`trip${idx}`} bottomDivider>
                        <Avatar source={{ uri: "https://cdn-icons-png.flaticon.com/512/1452/1452378.png" }} />
                        <ListItem.Content>
                            <ListItem.Title>{trip.tripName}</ListItem.Title>
                            <ListItem.Subtitle>{`${trip.destination} - ${moment(trip.tripDate, "YYYYMMDD").fromNow()}`}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        </View>
    )
}