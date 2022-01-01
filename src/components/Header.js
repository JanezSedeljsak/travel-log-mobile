
import React from 'react';
import { Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function headerWithIcon({ navigation }) {
    return {
        headerTitle: props => <Text {...props} />,
        headerRight: () => (
            <Ionicons
                name={'arrow-undo'} size={25} color={'#eee'} style={{ marginHorizontal: 15 }}
                onPress={() => navigation.getParent()?.navigate('Home')}
            />
        ),
    }
}