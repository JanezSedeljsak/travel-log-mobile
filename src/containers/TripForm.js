import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../redux/user'
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default ({ navigation }) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Input
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                onChangeText={() => {}}
            />
        </View>
    )
}