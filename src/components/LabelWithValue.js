import React from 'react'
import { Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

export default function LabelWithValue({ label, value }) {
    return (
        <ListItem bottomDivider containerStyle={{ backgroundColor: "transparent" }}>
            <ListItem.Content>
                <ListItem.Subtitle>{label}:</ListItem.Subtitle>
                <ListItem.Title>{value}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )
}