import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

const CreateTodoComponent = ({ closeModal, handleTodo }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTodo = () => {
    if (taskName === "" || description === "") {
      closeModal();
      return;
    } else {
      handleTodo(description, taskName);
      closeModal();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <TextInput
          onChangeText={(value) => setTaskName(value)}
          value={taskName}
          style={styles.input}
          placeholder="title"
        />

        <TextInput
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setDescription(text)}
          value={description}
          style={styles.input}
          placeholder="description"
        />
        <TouchableOpacity onPress={handleCreateTodo} style={styles.button}>
          <Text style={styles.textButton}>Valider</Text>
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
    backgroundColor: "pink",
    flex: 1,
  },
  contents: {
    backgroundColor: "yellow",
    margin: 50,
    padding: 40,
    borderRadius: 10,
    height: "70%",
  },
  input: {
    width: "90%",
    marginHorizontal: "5%",
    padding: 10,
    marginBottom: 10,
    height: 40,
    marginTop: 25,
    backgroundColor: "#ffff",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#6B21A8",
    padding: 10,
    borderRadius: 5,
    marginTop: 50,
    width: 110,
  },
  textButton: {
    alignItems: "center",
  },
});
