import React from 'react';
import { View, Image } from 'react-native'
import { groupProfilePicture } from '../../../styles';

export default function profilePicture() {

    return (
        <Image
            style={groupProfilePicture}
            source={require('../../../assets/default-group.jpg')}
        />
    )
}