import React from "react";
import { Stylesheet, View, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Svg, Path } from "react-native-svg";

export default function MealPicker({
  mealName,
  setMealName,
  mealList,
  setShowMealInput,
}) {
  return (
    <View style={styles.mealPicker}>
      <Picker
        style={styles.picker}
        selectedValue={mealName}
        onValueChange={(itemValue) => setMealName(itemValue)}
      >
        {mealList.map((mealName, index) => (
          <Picker.Item
            key={index}
            label={mealName}
            value={mealName}
            color="black"
          />
        ))}
      </Picker>
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => setShowMealInput(true)}
      >
        <Svg fill="#003a5d" viewBox="0 0 52 52">
          <Path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2 s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2 S39.604,28,38.5,28z" />
        </Svg>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mealPicker: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    width: 240,
    height: 60,
  },
  plusButton: {
    height: 30,
    width: 30,
  },
});
