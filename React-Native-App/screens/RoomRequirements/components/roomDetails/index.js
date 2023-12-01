import axios from 'axios'
import { API_URL } from '../../../../constants'
import { Text } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../../context/authContext'

export default function roomDetails(props) {
    const { token } = useContext(AuthContext)

    const [roomDetails, setRoomDetails] = useState()

    const request = async () => {
        const url = API_URL + "api/roomRequirementsScreenAPI/roomDetails"
        const headers = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${token || ''}`
            }
        }
        const body = {
            id_sala: props.id_sala
        }

        await axios.post(url, body, headers)
            .then((res) => {
                setRoomDetails(res.data)
            }).catch(function (error) { console.error(error) })
    }

    useEffect(() => {
        console.log("Componente montado");

        // A função de retorno será chamada quando o componente for desmontado
        return () => {
            console.log("Componente desmontado");
        };
    }, []);

    useEffect(() => {
        request()
    }, [props.id_sala])

    return (
        <>
            <Text>Entrar na sala: { roomDetails.name }</Text>
            <Text>Descrição da Sala: { roomDetails.description }</Text>
        </>
    )
}