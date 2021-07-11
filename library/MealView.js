import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useFonts } from "expo-font";

import ProductView from "./ProductView";

export default function MealView({ meal, deleteProduct, setSelectedPhoto }) {
  const [fontLoaded] = useFonts({
    Raleway: require("../assets/fonts/Raleway.ttf"),
  });

  return (
    <View>
      <Text style={[styles.mealTitle, fontLoaded && { fontFamily: "Raleway" }]}>
        {meal.name}
      </Text>
      {meal.products.map((product, index) => (
        <ProductView
          key={index}
          product={product}
          deleteProduct={deleteProduct}
          setSelectedPhoto={setSelectedPhoto}
        ></ProductView>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mealTitle: {
    fontSize: 23,
    paddingLeft: 45,
    letterSpacing: 3,
    color: "#404040",
    textTransform: "uppercase",
  },
});
