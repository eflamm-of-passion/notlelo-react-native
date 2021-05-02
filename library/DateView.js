import React from "react";
import { StyleSheet, View, Text } from "react-native";
import i18n from "../i18n";

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
      />
    ));
  };

  const displayReadableDate = (date) => {
    const trimmedDate = date.split("-");
    const jsDate = new Date(trimmedDate[2], trimmedDate[1] - 1, trimmedDate[0]);
    return (
      getDisplayableDayOfTheWeek(jsDate.getDay()) +
      " " +
      jsDate.getDate() +
      (jsDate.getDate() === 1 ? i18n.t("day.firstShort") : "") +
      " " +
      getDisplayableMonth(jsDate.getMonth())
    );
  };

  const getDisplayableDayOfTheWeek = (numberOfTheDay) => {
    const daysOfTheWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return i18n.t("day." + daysOfTheWeek[numberOfTheDay]);
  };

  const getDisplayableMonth = (numberOfTheMonth) => {
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    return i18n.t("month." + months[numberOfTheMonth]);
  };

  return (
    <View styles={styles.scroll}>
      <Text style={styles.dateTitle}>{displayReadableDate(date.name)}</Text>
      {displayMeals()}
    </View>
  );
}

const styles = StyleSheet.create({
  dateTitle: {
    fontSize: 35,
    paddingLeft: 10,
    letterSpacing: 1,
    color: "#404040",
  },
});
