import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import i18n from './i18n';

export default function HomeScreen({navigation}) {
   return (
       <View style={styles.container}>
           <ImageBackground source={require('./assets/ripped-paper.png')} style={styles.title}> 
                <Text style={styles.titleText}>{i18n.t('home.title')}</Text>
            </ImageBackground>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
                    <Text style={styles.buttonText}>{i18n.t('home.camera')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Library')}>
                    <Text style={styles.buttonText}>{i18n.t('home.library')}</Text>
                </TouchableOpacity>
            </View>
           <StatusBar style="light" />
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
        fontSize: 70,
        lineHeight: 100,
        color: 'white',
        letterSpacing: 7,
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
        height: 60,
        color: 'darkgray',
        marginTop: 25
    },
    buttonText: {
        fontSize: 21,
        letterSpacing: 6,
        textTransform: 'uppercase',
        color: '#404040',
    }
});