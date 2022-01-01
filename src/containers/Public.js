import React from 'react';
import { View, Text } from 'react-native';
import Dashboard from 'react-native-dashboard';

const data = [{
    name: 'Login/Register',
    background: '#ef2648',
    route: 'Auth'
}, {
    name: 'Browse anonymously',
    background: '#fbc800',
    route: 'Browse'
}];

export default ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '95%', marginHorizontal: '2.5%', backgroundColor: '#5a9a91', borderRadius: 5, flex: 0.5, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 16, color: '#eee', margin: 15, textAlign: 'center', fontWeight: 'bold' }}>{"~Pass on the beautiful memories you've made around the world~"}</Text>
            </View>

            <Dashboard
                data={data}
                background={true}
                column={2}
                rippleColor={'#3498db'}
                marginHorizontal={'2.5%'}
                card={card => navigation.navigate(card.route)}
            />
        </View>
    )
}