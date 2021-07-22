import React, {useState, useEffect} from 'react';
import { withNavigation } from 'react-navigation'
import {View, StyleSheet, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import api from '../services/api';




function SpotList({ sangue, navigation }) {





    const [spots, setSpots] = useState([])
    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: {sangue}
            })
            setSpots(response.data);

        }
        loadSpots();

     
    }, []);


    function logOut() {
        navigation.navigate('Login');
    }

    function handleNavigate(id) {
        navigation.navigate('Book', { id });
    }

 
  
    return (
    
    <View style={styles.container}>
     

        <Text style={styles.title}> Unidades <Text style={styles.bold}> {sangue} </Text></Text>
        
        <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={spot => spot._id} 
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
        

            <View style={styles.listItem}>
                <Image style={styles.thumbnail} source={{uri: item.thumbnail_url}} />
                <Text style={styles.hospital}> {item.hospital}</Text>
                <Text style={styles.endereco}>{item.endereco}</Text>
                <Text style={styles.sangue}>{item.sangue}</Text>
                <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                    <Text style={styles.buttonText}>Solicitar reserva</Text>
                 </TouchableOpacity>
               
            </View>

            
            
        )}/>


        
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        
    },
    title:{
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 5,
        marginBottom: 15,
    },
    bold: {
        fontWeight: 'bold'
    },
    
    list: {
        paddingHorizontal: 20,
    },
    listItem: {
        marginRight: 15,

    },
    thumbnail: {
        width:200,
        height:120,
        resizeMode:'cover',
        borderRadius: 2,
    },

    hospital: {
        fontSize: 24,
        fontWeight:'bold',
        color:'#333',
        marginTop: 10,
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },

    buttonLogOut: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 10,
    }


});

export default withNavigation(SpotList);

