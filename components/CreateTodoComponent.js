import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";

const CreateTodoComponent = ({ closeModal, handleTodo }) => {
  // const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTodo = () => {
    if (description === "") {
      closeModal();
      return;
    } else {
      handleTodo(description, "");
      closeModal();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setDescription(text)}
          value={description}
          style={styles.input}
          placeholder="Description"
        />
        <TouchableOpacity onPress={handleCreateTodo} style={styles.button}>
          <Text style={styles.textButton}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateTodoComponent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#55555580",
    flex: 1,
  },
  contents: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FAF5FF",
    borderRadius: 10,
    padding: 30,
    position: "absolute",
    top: "40%",
    left: "5%",
  },
  input: {
    width: "80%",
    borderColor: "#6B21A8",
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
  },
  button: {
    width: 42,
    height: 42,
    backgroundColor: "#6B21A8",
    paddingTop: 12,
    borderRadius: 100,
  },
  textButton: {
    textAlign: "center",
    color: "white",
    fontWeight: 700,
  },
});
