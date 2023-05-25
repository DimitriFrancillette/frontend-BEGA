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
      <Text style={styles.titleTodo}>
        {title} {description}
      </Text>
      <View style={styles.tasksContainer}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={() => submitCheckbox()}
          color={isChecked ? "green" : undefined}
        />
        <Text>
          {participants.map((data, i) => (
            <Text key={i}> {data.email}</Text>
          ))}
        </Text>

        <FontAwesome
          name="trash"
          size={25}
          onPress={() => handleDeleteTodo()}
          color="#6B21A8"
        />

        {/* <FontAwesome name="user-circle" size={40} color="#6B21A8" /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  checkbox: {
    height: 32,
    width: 32,
  },
  tasksContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // -----------------------------------

  titleTodo: {
    fontSize: 20,
    fontFamily: "Roboto",
    textAlign: "center",
  },
});
