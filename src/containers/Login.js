import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../redux/user'
import { View, Text } from 'react-native';

export default () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null);
    const dispatch = useDispatch();

    const loginFinish = values => {
        dispatch(actions.login(values));
    }

    useEffect(() => {
        dispatch(actions.logOut()) //reset state and clear any errors
    }, [dispatch])

    return (
        <View>
            <Text>
                login
            </Text>
        </View>

    )
}