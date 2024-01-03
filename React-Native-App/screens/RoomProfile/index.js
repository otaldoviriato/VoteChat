import React from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import ProfilePicture from './components/profilePicture'
import GroupInfo from './components/groupInfo'
import GroupLink from './components/groupLink'
import GroupDescription from './components/groupDescription'
import GroupVotations from './components/groupVotations'
import GroupMedia from './components/groupMedia'
import GroupMembers from './components/groupMembers'
import { backgroundColor, backgroundDraft, groupProfileName } from '../../styles'

export default function RoomProfile({ route }) {
    const data = route.params.params.data

    return (
        <>
            <View style={backgroundColor}>
                <ImageBackground
                    source={require('../../assets/background.png')}
                    style={backgroundDraft}>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={groupProfileName} >{data.name}</Text>
                        <GroupInfo data={data} />
                        <GroupLink data={data} />
                        <GroupDescription data={data} />
                        <GroupVotations data={data} />
                        <GroupMedia data={data} />
                        <GroupMembers data={data} />
                    </View>
                </ImageBackground>
            </View>
        </>
    )
}