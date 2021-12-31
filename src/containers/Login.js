import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../redux/user'
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default ({ navigation }) => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null);
    const dispatch = useDispatch();

    const loginFinish = () => {
        dispatch(actions.login({ email, password }));
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        dispatch(actions.logOut()) //reset state and clear any errors
    }, [dispatch])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Input
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                onChangeText={setEmail}
            />
            <Input
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={setPassword}
            />
            <Button
                title="Log in"
                buttonStyle={{
                    backgroundColor: '#3c71b6',
                    borderRadius: 5,
                }}
                titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
                containerStyle={{
                    height: 40,
                    width: '95%',
                    marginHorizontal: '2.5%',
                    marginVertical: 10,
                }}
                onPress={loginFinish}
            />
            <Text
                onPress={() => navigation.navigate('Register')}
                style={{ width: '95%', marginHorizontal: '2.5%', textAlign: 'left', fontSize: 15, color: '#3c71b6' }}
            >
                Don't have account? Register here!
            </Text>
        </View>

    )
}