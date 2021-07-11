import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import i18n from "../../i18n";
import { useFonts } from "expo-font";

import {
  getProductNamesAndOccurrences,
  getProductNameSuggestions,
} from "../../event-service";

export default function ProductInput({
  productName,
  setProductName,
  eventName,
}) {
  const [fontLoaded] = useFonts({
    Sarabun: require("../../assets/fonts/Sarabun.ttf"),
  });
  const [productNames, setProductNames] = useState([]);
  const [productNameSuggestions, setProductNameSuggestions] = useState([]);
  const MAX_SUGGESTIONS = 3;

  useEffect(() => {
    fetchProductNames();
  }, []);

  const fetchProductNames = useCallback(async () => {
    const p = await getProductNamesAndOccurrences(eventName);
    setProductNames(p);
    processSuggestions(p, "");
  }, []);

  const processSuggestions = async (productNames, filter) => {
    setProductNameSuggestions(
      await getProductNameSuggestions(productNames, filter, MAX_SUGGESTIONS)
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        autoFocus={true}
        placeholder={i18n.t("camera.productNamePlaceHolder")}
        onChangeText={(text) => {
          setProductName(text);
          processSuggestions(productNames, text);
        }}
        value={productName}
      />
      <View style={styles.suggestionContainer}>
        {productNameSuggestions.map((productNameSuggestion) => (
          <TouchableOpacity
            key={productNameSuggestion}
            onPress={() => {
              setProductName(productNameSuggestion);
              processSuggestions(productNames, productNameSuggestion);
            }}
            style={styles.suggestionButton}
          >
            <Text
              style={[
                styles.suggestionText,
                fontLoaded && { fontFamily: "Sarabun" },
              ]}
            >
              {productNameSuggestion}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  textInput: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  suggestionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  suggestionButton: {
    backgroundColor: "darkgrey",
    borderRadius: 10,
    margin: 2,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 8,
    paddingLeft: 8,
  },
  suggestionText: {
    color: "white",
  },
});
