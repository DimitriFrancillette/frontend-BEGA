import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FirstMessage = () => {
  return (
    <View style={styles.container}>
        <Text>Tu n'as pas encore d'évènements prévus ?</Text>
        <Text>Créé un event et invite tes copains !</Text>
      </View>
  );
};

export default FirstMessage;
const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "80%",
    backgroundColor: "#6B21A8",
    color: "#ffff",
    fontWeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
