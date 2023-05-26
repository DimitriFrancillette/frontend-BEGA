import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../constants";

const FriendsList = () => {
  const user = useSelector((state) => state.user.value);
  const [friendsList, setFriendsList] = useState();

  useEffect(() => {
    const fetchFriendsList = fetch(
      `${BACKEND_URL}/users/getfriends/${user.userId}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFriendsList(data.user.friends);
      });

    return () => {
      fetchFriendsList;
    };
  }, []);

  const friends = friendsList?.map((data, i) => {
    return (
      <Text key={i} style={styles.name}>
        {data.firstname} {data.lastname}
      </Text>
    );
  });
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Liste d'amis</Text>
        <ScrollView style={styles.scrollView}>
          <View style={styles.friendsContainer}>
            {friends}
            <View style={styles.inviteContainer}>
              <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={60}
              ></KeyboardAvoidingView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FAF5FF",
  },
  scrollView: {
    width: "100%",
  },
  friendsContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  inviteContainer: {
    width: "80%",
  },
  invitation: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    padding: 4,
  },
  buttonContainer: {
    backgroundColor: "#6B21A8",
    borderRadius: 10,
    padding: 8,
    alignSelf: "center",
  },
  textButton: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  title: {
    fontSize: 38,
    fontWeight: 700,
    fontFamily: "Inter",
    textAlign: "center",
    marginBottom: 30,
  },
  name: {
    padding: 3,
    paddingTop: 4,
    borderColor: "#6B21A8",
    borderWidth: 5,
    textAlign: "center",
    width: 100,
    marginBottom: 5,
    color: "#d48221",
  },
  email: {
    color: "#d48221",
  },
  input: {
    width: "100%",
    borderColor: "#6B21A8",
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
  },
  messagesContainer: {
    marginTop: 20,
  },
});

export default FriendsList;
