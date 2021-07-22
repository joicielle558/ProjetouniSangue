
import SpotList from '../components/SpotList';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, AsyncStorage, Image, View, StyleSheet } from 'react-native';

import socketio from 'socket.io-client';

import logo from '../assets/logo.png';

export default function List() {
    const [sangue, setSangue] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
                const socket = socketio('http://192.168.0.104:3333', {
                query: {user_id}
            })

            socket.on('booking_response', booking => {
                alert(`O seu agendamento no ${booking.spot.hospital} em ${booking.date} foi ${booking.approved ? 'APROVADO' : 'REJEITADO'} `);
            })
        })
    },[]);

    useEffect(() => {
        AsyncStorage.getItem('sangue').then(storagedSangue => {
            const sangueArray = storagedSangue.split(',').map(sangue => sangue.trim());

            setSangue(sangueArray);
        })
    },[]);
    
   return (



       <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logo} /> 

           



            <ScrollView>
                {sangue.map(sangue => <SpotList Key={sangue} sangue={sangue} />)}
            </ScrollView>

           <SpotList />
       </SafeAreaView>
   )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },



    logo: {
        height:46,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10

    },
});