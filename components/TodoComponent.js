import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Checkbox from "expo-checkbox";

export default function TodoComponent({
  handleCheckbox,
  title,
  description,
  participants,
  id,
}) {
  const [isChecked, setChecked] = useState(true);
  const submitCheckbox = () => {
    setChecked(!isChecked);
    handleCheckbox(isChecked, id);
  };
  console.log(participants);
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
              value={!isChecked}
              onValueChange={() => submitCheckbox()}
              color={isChecked ? "#4630EB" : undefined}
            />
            <View style={styles.inputContainer}>
              <View>
                <Text>
                  {participants.map((data) => (
                    <>{data.email} - </>
                  ))}
                </Text>
              </View>
            </View>
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
    backgroundColor: "#FAF5FF",
    paddingTop: 5,
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
