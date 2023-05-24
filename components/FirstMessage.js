import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FirstMessage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text>tst</Text>
      </View>
    </View>
  );
};

export default FirstMessage;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.6)",
    flex: 1,
  },
  contents: {
    backgroundColor: "white ",
    margin: 50,
    padding: 40,
    borderRadius: 10,
    height: "70%",
  },
});
