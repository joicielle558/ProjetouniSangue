import React, { useState, useEffect} from 'react';
import api from '../services/api';




import { 
    View,
    AsyncStorage,
    KeyboardAvoidingView,
    Platform,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';


export default function Login({ navigation }) {
    
    const [email, setEmail] = useState('');
    const [sangue,setSangue] = useState('');
    
    useEffect(() => {
        AsyncStorage.getItem('user').then(user =>{
            if(user) {
                navigation.navigate('List');
            }
        })
    },[]);
    
    async function handleSubmit() {
        const response = await api.post('/sessions', {
            email
            
        })
        
        const { _id } = response.data;
        
        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('sangue', sangue);
        
        
        navigation.navigate('List');

    }
    
    return ( 
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={StyleSheet.container}>
       

        <View style={styles.form}>
            <Text style={styles.label}> Seu E-mail*</Text>
            <TextInput
                style = {styles.input}
                placeholder="Seu e-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail} //{text => setEmail(text)}
            /> 

        <Text style={styles.label}> Tipo sanguíneo*</Text>
            <TextInput
                style = {styles.input}
                placeholder="Tipo sanguíneo"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={sangue}
                onChangeText={setSangue} //{text => setSangue(text)}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Encontrar Hospitais</Text>
            </TouchableOpacity>
        
            </View>
        

        </KeyboardAvoidingView>
        ); 
    }

const styles = StyleSheet.create({
    container: {
        flex:  1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
   
  
        
        
        
    logo: {
        height:46,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10

    },

    
 

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom:8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

});