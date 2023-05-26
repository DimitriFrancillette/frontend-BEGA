import { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const AskFriendMessage = ({ message, acceptFriend, refuseFriend, userId }) => {
  const friendAccepted = () => {
    acceptFriend(userId);
  };

  const friendrefused = () => {
    refuseFriend(userId);
  };

  return (
    <View style={styles.container}>
      <Text>{message}</Text>

      <TouchableOpacity onPress={friendAccepted}>
        <FontAwesome name="check-circle" size={38} color="green" />
      </TouchableOpacity>

      <TouchableOpacity onPress={friendrefused}>
        <FontAwesome name="times-circle" size={38} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default AskFriendMessage;

styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
