import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FirstMessage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text>zazazazaazaz</Text>
      </View>
    </View>
  );
};

export default FirstMessage;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "50%",
    height: "30%",
    margin: 100,
    marginTop: 200,
    padding: 40,
    borderRadius: 10,
  },
});
