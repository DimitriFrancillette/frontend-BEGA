import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const askFriendMessage = ({ message, acceptFriend, refuseFriend, userId }) => {
  const friendAccepted = () => {
    acceptFriend(userId);
    console.log(userId);
  };
  const friendrefused = () => {
    refuseFriend(userId);
    console.log(userId);
  };
  return (
    <View style={styles.container}>
      <Text>{message}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={friendAccepted}>
          <Text style={styles.textButton}>Accepter</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={friendrefused}>
          <Text style={styles.textButton}>Refuser</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default askFriendMessage;
styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#7935b0",
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: "1px solid black",
  },
  buttonContainer: {
    backgroundColor: "#6B21A8",
    borderRadius: 10,
    marginTop: 20,
    paddingTop: 8,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: "center",
  },

  textButton: {
    color: "#DDA304",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
});
