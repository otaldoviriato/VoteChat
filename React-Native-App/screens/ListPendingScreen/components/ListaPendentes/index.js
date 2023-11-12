import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import VoteButton from '../VoteButton'

export default function (props) {
    const [dadosUsuariosPendetes, setdadosUsuariosPendetes] = useState([])

    //Limpa pendentes e retorna um array de strings contendo o _id dos pendentes.
    function obterIdPendentes(pendentes) {
        const idPendente = new Set()

        pendentes.forEach((objeto) => {
            idPendente.add(objeto.id_user)
        })
        // Converter o Set de remetentes únicos de volta para um array
        return Array.from(idPendente)
    }

    const Pendentes = obterIdPendentes(props.data.pendentes)

    useEffect(() => {
        async function fetchData(Pendentes) {
            try {
                const res = await fetch("http://192.168.100.2:3000/api/listPendingScreenAPI/getDataPendentes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        Pendentes,
                    }),
                })

                if (res.ok) {
                    const dataPendentes = await res.json()
                    setdadosUsuariosPendetes(dataPendentes)
                } else {
                    console.log('Error:', res.status)
                }

            } catch (error) {
                console.log('error fetching data', error)
            }
        }
        fetchData(Pendentes)
    }, [])

    return (
        <>
            <View style={{ flex: 1, width: '100%', paddingVertical: 4, paddingHorizontal: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8 }}>
                <FlatList
                    data={dadosUsuariosPendetes}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={{ padding: 6, backgroundColor: '#fff', borderRadius: 8, marginBottom: 6 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#3F5FBF' }}>
                                {item.name}
                            </Text>
                            <View>
                                <VoteButton salaId={props.data._id} userId={item._id} />
                            </View>
                        </View>
                    )}
                />
            </View>
        </>
    )
}