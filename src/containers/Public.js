import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Button } from 'react-native-elements';

const image = require('../assets/landing.jpg');

const Public = ({ navigation }) => (
    <View style={{ flex: 1 }}>
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', margin: 20 }}>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 17, color: '#444', fontWeight: 'bold' }}>
                        {"~ Pass on the beautiful memories you've made around the world ~"}
                    </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Button
                        title="Login/Register"
                        buttonStyle={{
                            width: '100%',
                            backgroundColor: 'transparent',
                            borderColor: '#ccc',
                            borderWidth: 2,
                            borderRadius: 20
                        }}
                        containerStyle={{ width: '100%' }}
                        titleStyle={{ fontWeight: 'bold', fontSize: 16, color: '#ccc' }}
                        onPress={() => navigation.navigate('Auth')}
                    />
                    <Button
                        title="Browse anonymously"
                        buttonStyle={{
                            backgroundColor: 'transparent',
                            borderColor: '#ccc',
                            borderWidth: 2,
                            borderRadius: 20
                        }}
                        containerStyle={{ width: '100%', marginVertical: 15 }}
                        titleStyle={{ fontWeight: 'bold', fontSize: 16, color: '#ccc' }}
                        onPress={() => navigation.navigate('Browse')}
                    />
                </View>

            </View>
        </ImageBackground>
    </View>
);

export default Public;