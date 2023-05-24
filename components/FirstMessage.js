import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FirstMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Tu n'as pas encore d'évènements prévus ?</Text>
      <Text style={styles.text1}>Créé un event et invite tes copains !</Text>
    </View>
  );
};

export default FirstMessage;
const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "80%",
    backgroundColor: "#6B21A8",

    fontWeight: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text1: {
    color: "#ffff",
  },
});
