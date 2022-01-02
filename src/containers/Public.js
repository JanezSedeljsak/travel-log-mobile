import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ImageBackground, Text, View } from "react-native";
import { actions } from "../redux/user";
import { Button } from 'react-native-elements';

const image = require('../assets/landing.jpg');

export default function Public({ navigation }) {
    const email = useSelector(state => state.user.email);
    const isAuth = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null);
    const dispatch = useDispatch();
    const textStyle = { color: '#555', fontSize: 16, fontWeight: 'bold' };

    function logOut() {
        dispatch(actions.logOut());
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', margin: 20 }}>
                    {(isAuth && email) ? (
                        <>
                        <Text style={{ ...textStyle, textAlign: 'center', fontSize: 22 }}>WELCOME</Text>
                        <Text style={{ ...textStyle, marginVertical: 10, textAlign: 'center' }}>{email}</Text>
                        </>
                    ) : null}
                    <Button
                        title={isAuth ? "Logout" : "Login/Register"}
                        buttonStyle={{
                            width: '100%',
                            backgroundColor: 'transparent',
                            borderColor: '#555',
                            borderWidth: 2,
                            borderRadius: 20
                        }}
                        containerStyle={{ width: '100%' }}
                        titleStyle={textStyle}
                        onPress={() => {
                            if (!isAuth) {
                                navigation.navigate('Auth')
                            } else {
                                logOut();
                            }
                        }}
                    />
                    <Button
                        title={isAuth ? 'Browse' : "Browse anonymously"}
                        buttonStyle={{
                            backgroundColor: 'transparent',
                            borderColor: '#555',
                            borderWidth: 2,
                            borderRadius: 20
                        }}
                        containerStyle={{ width: '100%', marginVertical: 15 }}
                        titleStyle={textStyle}
                        onPress={() => navigation.navigate('Browse')}
                    />
                </View>

            </ImageBackground>
        </View>
    );
}