import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import VoteButton from '../VoteButton';
import { API_URL } from '../../../../constants';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/authContext';
import axios from 'axios';

export default function VotationList(props) {
    const { token } = useContext(AuthContext);

    const [votations, setVotations] = useState([]);
    const [currentVotationIndex, setCurrentVotationIndex] = useState(0);
    const id_sala = props.id_sala;

    useEffect(() => {
        const fetchData = async () => {
            const url = `${API_URL}api/votationsScreenAPI/getDataVotations`;
            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token || ''}`,
                },
            };
            const body = { id_sala };

            try {
                const response = await axios.post(url, body, headers);
                setVotations(response.data);
            } catch (error) {
                console.error('Error fetching votations:', error);
            }
        };

        fetchData();
    }, [id_sala, token]);

    const handleNextVotation = () => {
        setCurrentVotationIndex((prevIndex) => (prevIndex + 1) % votations.length);
    };

    const currentVotation = votations[currentVotationIndex];

    return (
        <View style={styles.container}>
            {currentVotation ? (
                <View style={styles.votationContainer}>
                    <Text style={styles.votationText}>{currentVotation.action}</Text>
                    <Text style={styles.votationText}>{currentVotation._id}</Text>
                    <Text style={styles.votationText}>{currentVotation.actionDescription}</Text>
                    <View style={styles.voteButtonContainer}>
                        <VoteButton id_sala={id_sala} id_votacao={currentVotation._id} />
                    </View>
                </View>
            ) : (
                <Text style={styles.noVotationsText}>Nenhuma votação disponível</Text>
            )}
            <TouchableOpacity style={styles.nextButton} onPress={handleNextVotation}>
                <Text style={styles.nextButtonText}>Próxima Votação</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    votationContainer: {
        flex: 1,
        width: '100%',
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 8,
    },
    votationText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3F5FBF',
        marginBottom: 6,
    },
    voteButtonContainer: {
        marginTop: 12,
    },
    noVotationsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3F5FBF',
    },
    nextButton: {
        marginTop: 16,
        backgroundColor: '#86CBFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
