import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Button } from 'react-native-elements';

const image = require('../assets/landing.jpg');

const Public = ({ navigation }) => (
    <View style={{ flex: 1 }}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', margin: 20 }}>
                <Button
                    title="Login/Register"
                    buttonStyle={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        borderColor: '#555',
                        borderWidth: 2,
                        borderRadius: 20
                    }}
                    containerStyle={{ width: '100%' }}
                    titleStyle={{ fontWeight: 'bold', fontSize: 16, color: '#555' }}
                    onPress={() => navigation.navigate('Auth')}
                />
                <Button
                    title="Browse anonymously"
                    buttonStyle={{
                        backgroundColor: 'transparent',
                        borderColor: '#555',
                        borderWidth: 2,
                        borderRadius: 20
                    }}
                    containerStyle={{ width: '100%', marginVertical: 15 }}
                    titleStyle={{ fontWeight: 'bold', fontSize: 16, color: '#555' }}
                    onPress={() => navigation.navigate('Browse')}
                />
            </View>

        </ImageBackground>
    </View>
);

export default Public;