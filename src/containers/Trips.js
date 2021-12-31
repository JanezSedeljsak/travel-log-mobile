import React, { useEffect, useState } from 'react';
import { loadTrips } from '../api';
import moment from 'moment';
import { View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

export default () => {
    const [trips, setTrips] = useState([]);
    const [tripsForDisplay, setTripsForDisplay] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const trips = await loadTrips();
        setTrips(trips);
        setTripsForDisplay(trips)
    }

    return (
        <View>
            {tripsForDisplay.map((trip, idx) => (
                <ListItem key={`trip${idx}`} bottomDivider>
                    <Avatar source={{ uri: "https://cdn-icons-png.flaticon.com/512/1452/1452378.png" }} />
                    <ListItem.Content>
                        <ListItem.Title>{trip.tripName}</ListItem.Title>
                        <ListItem.Subtitle>{`${trip.destination} - ${moment(trip.tripDate, "YYYYMMDD").fromNow()}`}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            ))}
        </View>
    )
}