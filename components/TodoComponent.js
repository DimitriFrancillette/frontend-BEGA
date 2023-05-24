import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Checkbox from "expo-checkbox";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../constants";

export default function TodoComponent({
  handleCheckbox,
  title,
  description,
  participants,
  id,
  getRole,
  reloadTodo,
}) {
  const user = useSelector((state) => state.user.value);
  const isChecked = participants.some((e) => e.email === user.email);

  const submitCheckbox = () => {
    handleCheckbox(isChecked, id);
  };
  const handleDeleteTodo = () => {
    console.log("delete");
    fetch(`${BACKEND_URL}/todo/deletetodo`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ todoId: id }),
    });
    reloadTodo();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <KeyboardAvoidingView style={styles.eventInfosContainer}>
          <Text style={styles.titleTodo}>
            {title} {description}
          </Text>
          <View style={styles.tasksContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={() => submitCheckbox()}
              color={isChecked ? "#4630EB" : undefined}
            />
            <View style={styles.inputContainer}>
              <View>
                <Text>
                  {participants.map((data) => (
                    <Text> {data.email}</Text>
                  ))}
                </Text>
              </View>
            </View>

            <FontAwesome
              name="trash"
              size={35}
              onPress={() => handleDeleteTodo()}
            />

            <FontAwesome name="user-circle" size={40} color="#6B21A8" />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: "#FAF5FF",
    padding: 16,
  },
  scrollView: {
    width: "100%",
  },
  scrollViewContentContainer: {
    // flex: 1,
    alignItems: "center",
  },
  checkbox: {
    height: 40,
    width: 40,
  },
  eventInfosContainer: {
    width: "90%",
  },
  tasksContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    width: "75%",
    borderColor: "#6B21A8",
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
  },

  // -----------------------------------

  titleTodo: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Roboto",
    textAlign: "center",
    color: "green",
  },
});
