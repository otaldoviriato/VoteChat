import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import VoteButton from '../VoteButton'
import { API_URL } from '../../../../constants';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/authContext';
import axios from 'axios'

export default function votaionList (props) {
    const { user } = useContext(AuthContext)

    const [votations, setVotations] = useState([])
    const id_sala = props.id_sala

    useEffect(() => {
        const request = async () => {
            const url = API_URL+'api/votationsScreenAPI/getDataVotations'
            const headers = {
              headers: {
                "Content-Type": "application/json",
                 'Authorization': `${user.token || ''}`
              }
            }
            const body = { id_sala }
        
            await axios.post(url, body, headers)
              .then((res) => {
                setVotations(res.data)
              })
              .catch((err) => console.error('Error creating room:', err))
          }
        request()
    }, [])

    return (
        <>
            <View style={{ flex: 1, width: '100%', paddingVertical: 4, paddingHorizontal: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8 }}>
                <FlatList
                    data={votations}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={{ padding: 6, backgroundColor: '#fff', borderRadius: 8, marginBottom: 6 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#3F5FBF' }}>
                                {item.action}
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#3F5FBF' }}>
                                {item._id}
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#3F5FBF' }}>
                                {item.actionDescription}
                            </Text>
                            <View>
                                <VoteButton id_sala={id_sala} id_votado={item._id} />
                            </View>
                        </View>
                    )}
                />
            </View>
        </>
    )
}