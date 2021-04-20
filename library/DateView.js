import React from "react";
import { StyleSheet, View, Text } from "react-native";

import MealView from "./MealView";

export default function DateView({ date, deleteProduct, setSelectedPhoto }) {
  const displayMeals = () => {
    const mealList = [];
    for (const [mealName, products] of date.mealMap) {
      mealList.push({ name: mealName, products: products });
    }

    return mealList.map((meal, index) => (
      <MealView
        key={index}
        meal={meal}
        deleteProduct={deleteProduct}
        setSelectedPhoto={setSelectedPhoto}
      ></MealView>
    ));
  };

  const displayReadableDate = (date) => {
    return date.replace(/-/g, "/");
  };

  return (
    <View>
      <Text style={styles.mealTitle}>{displayReadableDate(date.name)}</Text>
      {displayMeals()}
    </View>
  );
}

const styles = StyleSheet.create({
  mealTitle: {
    fontSize: 40,
    paddingLeft: 10,
    letterSpacing: 1,
    color: "#404040",
    textTransform: "uppercase",
  },
});
