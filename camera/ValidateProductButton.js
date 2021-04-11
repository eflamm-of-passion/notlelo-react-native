import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export default function ValidateProductButton({openModal}) {
    return (
        <TouchableOpacity style={styles.validateButton} onPress={() => openModal()}>
            <Svg viewBox="0 0 512 512" width="40" height="40" fill="white">
                <Path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
            </Svg>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    validateButton: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        marginRight: 40
      },
});