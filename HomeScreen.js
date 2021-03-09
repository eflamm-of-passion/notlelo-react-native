import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({navigation}) {
   return (
       <View style={styles.container}>
           <ImageBackground source={require('./assets/ripped-paper.png')} style={styles.title}> 
                <Text style={styles.titleText}>Batch Number</Text>
            </ImageBackground>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Library')}>
                    <Text style={styles.buttonText}>Library</Text>
                </TouchableOpacity>
            </View>
           <StatusBar style="auto" />
       </View>
   ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      },
    title: {
        flex: 1,
        width: '100%',
        marginTop: -30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        width: '80%',
        textAlign: 'center',
        fontSize: 50,
        lineHeight: 80,
        color: 'white',
        letterSpacing: 8,
        textTransform: 'uppercase',
        textShadowColor: 'white',
        textShadowRadius: 4
    },
    buttons: {
        flex: 1,
        paddingBottom: 80,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        height: 60,
        color: 'darkgray',
        marginTop: 20
    },
    buttonText: {
        fontSize: 18,
        letterSpacing: 5,
        textTransform: 'uppercase',
        color: '#404040',
    }
});