import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";

import Icon from "../icons/Icon";
import { secondaryColor } from "../global";
import i18n from "../i18n";

// source : https://blog.theodo.com/2020/06/build-accordion-list-react-native/

export default function FrequentlyAskedQuestionView() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("faq.title")}</Text>
      <Dropdown title={i18n.t("faq.slowTakingPicture.question")}>
        <Text style={styles.answerText}>
          {i18n.t("faq.slowTakingPicture.answer")}
        </Text>
      </Dropdown>
      <Dropdown title={i18n.t("faq.saveThePictures.question")}>
        <Text style={styles.answerText}>
          {i18n.t("faq.saveThePictures.answer1")}
          <Icon type="share" color="grey" width={20} height={20} />
          {i18n.t("faq.saveThePictures.answer2")}
        </Text>
      </Dropdown>
      <Dropdown title={i18n.t("faq.availableOnIOS.question")}>
        <Text style={styles.answerText}>
          {i18n.t("faq.availableOnIOS.answer")}
        </Text>
      </Dropdown>
    </View>
  );
}

function Dropdown({ title, children }) {
  const [isOpened, setOpened] = useState(false);
  return (
    <View style={styles.questionContainer}>
      <View style={styles.questionLine}>
        <TouchableWithoutFeedback onPress={() => setOpened(!isOpened)}>
          <Text style={styles.questionText}>{title}</Text>
        </TouchableWithoutFeedback>
        <Icon
          type="right-arrow"
          color="black"
          width={20}
          height={20}
          rotation={isOpened ? 90 : 0}
        />
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
