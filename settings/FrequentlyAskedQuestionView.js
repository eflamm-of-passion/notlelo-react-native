import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

import Icon from "../icons/Icon";
import { secondaryColor } from "../global";
import i18n from "../i18n";

export default function FrequentlyAskedQuestionView() {
  const [fontLoaded] = useFonts({
    Sarabun: require("../assets/fonts/Sarabun.ttf"),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("faq.title")}</Text>
      <Dropdown title={i18n.t("faq.slowTakingPicture.question")}>
        <Text
          style={[styles.answerText, fontLoaded && { fontFamily: "Sarabun" }]}
        >
          {i18n.t("faq.slowTakingPicture.answer")}
        </Text>
      </Dropdown>
      <Dropdown title={i18n.t("faq.saveThePictures.question")}>
        <Text
          style={[styles.answerText, fontLoaded && { fontFamily: "Sarabun" }]}
        >
          {i18n.t("faq.saveThePictures.answer1")}
          <Icon type="share" color="grey" width={20} height={20} />
          {i18n.t("faq.saveThePictures.answer2")}
        </Text>
      </Dropdown>
      <Dropdown title={i18n.t("faq.availableOnIOS.question")}>
        <Text
          style={[styles.answerText, fontLoaded && { fontFamily: "Sarabun" }]}
        >
          {i18n.t("faq.availableOnIOS.answer")}
        </Text>
      </Dropdown>
      <Dropdown title={i18n.t("faq.foundABug.question")}>
        <Text
          style={[styles.answerText, fontLoaded && { fontFamily: "Sarabun" }]}
        >
          {i18n.t("faq.foundABug.answer")}
        </Text>
      </Dropdown>
    </View>
  );
}

function Dropdown({ title, children }) {
  const [isOpened, setOpened] = useState(false);
  const [fontLoaded] = useFonts({
    Raleway: require("../assets/fonts/Raleway.ttf"),
  });

  return (
    <View style={styles.questionContainer}>
      <View style={styles.questionLine}>
        <TouchableWithoutFeedback onPress={() => setOpened(!isOpened)}>
          <View style={styles.questionLine}>
            <Text
              style={[
                styles.questionText,
                fontLoaded && { fontFamily: "Raleway" },
              ]}
            >
              {title}
            </Text>
            <Icon
              type="right-arrow"
              color="black"
              width={20}
              height={20}
              rotation={isOpened ? 90 : 0}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {isOpened && children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  title: {
    fontSize: 30,
    paddingLeft: 10,
    marginBottom: 10,
    letterSpacing: 1,
    color: secondaryColor,
    backgroundColor: "white",
  },
  questionContainer: {
    borderBottomWidth: 1,
    borderColor: "lightgrey",
  },
  questionLine: {
    flexDirection: "row",
    alignItems: "center",
  },
  questionText: {
    width: "93%",
    height: 70,
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 4,
    fontSize: 19,
    color: secondaryColor,
    backgroundColor: "white",
  },
  answerText: {
    fontSize: 14,
    backgroundColor: "white",
    paddingLeft: 7,
    paddingRight: 5,
    paddingBottom: 10,
    textAlign: "justify",
  },
});
