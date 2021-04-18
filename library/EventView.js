import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import DateView from './DateView';
import ShareEventButton from './ShareEventButton';
import ExpandProductPhotoModal from './ExpandProductPhotoModal';

export default function EventView({event, deleteProduct, setSelectedPhoto}) {

    const displayMeals = () => {
        
        const dateList = [];
        for(const [dateName, mealMap] of event.dateMap) {
          dateList.push({name: dateName, mealMap: mealMap});
        }

        return dateList.map(date => (
            <DateView key={Math.random()} date={date} deleteProduct={deleteProduct} setSelectedPhoto={setSelectedPhoto}></DateView>
        ));
      }

    return (
        <View key={Math.random()}>
            <View style={styles.eventTitle}>
                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.eventTitleText}>{event.name}</Text>
                <ShareEventButton event={event}></ShareEventButton>
            </View>
            { displayMeals()}
            <ExpandProductPhotoModal setSelectedPhoto={setSelectedPhoto}></ExpandProductPhotoModal>
        </View>
    );
}

const styles = StyleSheet.create({
    eventTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 90,
        backgroundColor: '#003a5d'
    },
    eventTitleText: {
        width: '90%',
        paddingTop: 20,
        paddingLeft: 10,
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 40,
        letterSpacing: 8,
    },
});