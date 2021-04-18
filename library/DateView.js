import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import MealView from './MealView';

export default function DateView({date, deleteProduct, setSelectedPhoto}) {

    const displayMeals = () => {
        
        const mealList = [];
        for(const [mealName, products] of date.mealMap) {
          mealList.push({name: mealName, products: products});
        }

        return mealList.map(meal => (
            <MealView key={Math.random()} meal={meal} deleteProduct={deleteProduct} setSelectedPhoto={setSelectedPhoto}></MealView>
        ));
      }

    return (
        <View key={Math.random()}>
            <Text style={styles.mealTitle}>{date.name}</Text>
            { displayMeals()}
        </View>
    );
}

const styles = StyleSheet.create({
    mealTitle: {
        fontSize: 25,
        paddingLeft: 40,
        letterSpacing: 3,
        color: '#404040',
        textTransform: 'uppercase'   
    }, 
});