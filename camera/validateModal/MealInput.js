import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import i18n from "../../i18n";

import Icon from "../../icons/Icon";

export default function MealInput({ onValidate, onCancel }) {
  const [inputMealName, setInputMealName] = useState("");

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          placeholder={i18n.t("library.mealInputPlaceholder")}
          style={styles.mealInputText}
          onChangeText={(text) => setInputMealName(text)}
          value={inputMealName}
        />
        <TouchableOpacity
          style={styles.mealInputButton}
          onPress={() => onValidate(inputMealName)}
        >
          <Icon type="round-validate" color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mealInputButton}
          onPress={() => onCancel()}
        >
          <Icon type="round-cancel" color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealInputText: {
    width: 220,
    height: 50,
    borderBottomWidth: 1,
    borderColor: "lightgrey",
  },
  mealInputButton: {
    height: 40,
    width: 40,
    paddingLeft: 10,
  },
});
