import React from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import ProfilePicture from './components/profilePicture'
import GroupInfo from './components/groupInfo'
import GroupLink from './components/groupLink'
import GroupDescription from './components/groupDescription'
import GroupVotations from './components/groupVotations'
import { backgroundColor, backgroundDraft, groupProfileName, groupProfileViewInfo, groupProfileInfos, groupProfileView, groupProfileViewName } from '../../styles';

export default function RoomProfile({ route }) {
    const data = route.params.params.data

    return (
        <>
            <View style={backgroundColor}>
                <ImageBackground
                    source={require('../../assets/background.png')}
                    style={backgroundDraft}>

                    <View style={{ alignItems: 'center' }}>
                        <ProfilePicture />
                        <Text style={groupProfileName} >{data.name}</Text>
                        <GroupInfo data={data} />
                        <GroupLink data={data} />
                        <GroupDescription data={data} />
                        <GroupVotations data={data} />
                        
                        <View style={groupProfileView}>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <Text style={groupProfileViewName}>Descrição  |  </Text>
                                <Text style={groupProfileViewInfo}>Atualizado em { }</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: 'space-between', width: '100%' }}>
                                <Text style={groupProfileInfos}>{data.description ? data.description : 'O grupo ainda não tem uma descrição, adicione uma para que ela apareça aqui!'}</Text>
                            </View>
                        </View>

                    </View>
                </ImageBackground>
            </View>
        </>
    )
}