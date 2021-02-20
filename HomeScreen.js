import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({navigation}) {
   return (
       <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Batch Number</Text>
            </View>
            <View style={styles.buttons}>
                <Button style={styles.button} title={'Start'}
                    onPress={() => navigation.navigate('Camera')}
                />
            </View>
           <StatusBar style="auto" />
       </View>
   ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'darkslategrey',
        alignItems: 'center',
        justifyContent: 'center',
      },
    title: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 40,
        color: '#a1f5ff',
        letterSpacing: 2,
        textTransform: 'capitalize'
    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        flex: 1,
    }
});