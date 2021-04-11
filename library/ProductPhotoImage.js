import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function ProductPhotoImage({photo, setSelectedPhoto}) {

    return (
        <TouchableOpacity key={Math.random()} onPress={() => setSelectedPhoto(photo)}>
            <Image style={styles.photo} source={{uri: photo.uri}}/> 
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    photo: {
        width: 120,
        height: 120,
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 5,
    },
});