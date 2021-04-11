import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ProductView from './ProductView';

export default function MealView({meal, deleteProduct, setSelectedPhoto}) {

    return (
        <View key={Math.random()}>
            <Text style={styles.mealTitle}>{meal.name}</Text>
            {meal.products.map(product => (
                <ProductView key={Math.random()} product={product} deleteProduct={deleteProduct} setSelectedPhoto={setSelectedPhoto}></ProductView>
            ))}
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