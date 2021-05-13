import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Svg, Path } from "react-native-svg";

import { primaryColor } from "../../global";
import Icon from "../../icons/Icon";

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
        <Icon type="round-plus" color={primaryColor} />
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
