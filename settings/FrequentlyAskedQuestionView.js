import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";

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
    </View>
  );
}

function Dropdown({ title, children }) {
  const [isOpened, setOpened] = useState(false);
  return (
    <View>
      <TouchableWithoutFeedback
        style={styles.questionContainer}
        onPress={() => setOpened(!isOpened)}
      >
        <Text style={styles.questionText}>{title}</Text>
      </TouchableWithoutFeedback>
      {isOpened && children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    marginTop: 30,
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
    flex: 1,
  },
  questionText: {
    flexDirection: "row",
    height: 70,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    fontSize: 19,
    color: secondaryColor,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  answerText: {
    fontSize: 14,
    backgroundColor: "white",
    paddingLeft: 5,
    textAlign: "justify",
  },
});
