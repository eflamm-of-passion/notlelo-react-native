import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';

import EventService from '../EventService';

export default function ShareEventButton({event}) {

    const shareEvent = async (event) => {
        await EventService.shareEvent(event);
    }

    return (
        <TouchableOpacity style={styles.shareEventButton} onPress={() => shareEvent(event.name)}>
            <Svg viewBox="0 0 384.973 384.973" style="enable-background:new 0 0 384.973 384.973;" fill="white">
              <Path d="M103.751,256.682h24.241c16.866-95.677,100.2-168.424,200.714-168.424c4.211,0,8.217,0.036,12.259,0.072l-44.079,44.067 c-4.704,4.704-4.704,12.307,0,17.011c2.346,2.346,5.426,3.525,8.505,3.525s6.16-1.179,8.505-3.525l71.075-72.94l-71.063-72.94 c-4.704-4.704-12.307-4.704-17.011,0c-4.704,4.704-4.704,12.307,0,17.011l43.682,43.682c-3.826-0.012-7.459-0.036-11.369-0.036 C215.284,64.197,121.099,147.627,103.751,256.682z"/>
              <Path d="M348.88,180.458c-6.641,0-12.03,5.39-12.03,12.03v168.424H24.062V120.306h108.273c6.641,0,12.03-5.39,12.03-12.03 c0-6.641-5.39-12.03-12.03-12.03h-0.361H24.062c-13.281,0-24.061,10.779-24.061,24.061v240.606 c0,13.281,10.779,24.061,24.061,24.061H336.85c13.281,0,24.061-10.779,24.061-24.061V192.488 C360.911,185.847,355.521,180.458,348.88,180.458z"/>
            </Svg>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    shareEventButton: {
        alignSelf : 'center',
        width: 35,
        height: 35,
        marginTop: 10,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }
});