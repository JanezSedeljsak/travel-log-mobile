import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../redux/user'
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default ({ navigation }) => {
    const isLoading = useSelector(state => state.user.isFetching === true);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null);
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");

    function registerFinish() {
        dispatch(actions.register({ email, fullName, password }));
    }

    useEffect(() => {
        dispatch(actions.logOut()) //reset state and clear any errors
    }, [dispatch]);

    if (isLoggedIn) {
        navigation.getParent()?.navigate('Browse');
        return null;
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <Input
                placeholder='Full name'
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                onChangeText={setFullName}
            />
            <Input
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                onChangeText={setEmail}
            />
            <Input
                secureTextEntry={true}
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
                onPress={registerFinish}
                loading={isLoading}
            />
            <Text
                onPress={() => navigation.navigate('Login')}
                style={{ width: '95%', marginHorizontal: '2.5%', textAlign: 'left', fontSize: 15, color: '#3c71b6' }}
            >
                Already have account? Login here!
            </Text>
        </View>
    )
}