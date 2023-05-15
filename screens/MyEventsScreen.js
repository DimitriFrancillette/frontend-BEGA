import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from "react-native";

import { useState } from "react";

export default function EventScreen({ navigation }) {
  const [search, setSearch] = useState("");

  return (
    <>
      <View style={styles.container1}>
        <Text style={styles.title}>My Events</Text>
        <KeyboardAvoidingView>
          <TextInput
            onChangeText={(value) => setSearch(value)}
            value={search}
            style={styles.input}
            placeholder="search"
            iconName="burger"
          />
        </KeyboardAvoidingView>
        <View style={styles.container2}>
          <Text>Event's Name</Text>
          <Text>Date</Text>
          <KeyboardAvoidingView>
            <TouchableOpacity
              style={styles.buttonInfos}
              activeOpacity={0.8}
              // onPress={() => }
            >
              <Text style={styles.textButtonInfos}>Infos</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "#FAF5FF",
    alignItems: "center",
    paddingTop: 60,
    paddingLeft: 50,
  },
  title: {
    width: "80%",
    fontSize: 48,
    fontWeight: 600,
    fontFamily: "roboto",
  },
  input: {
    width: 90,
    padding: 10,
    margin: 50,
    height: 40,
    marginTop: 25,
    backgroundColor: "#ffff",
    fontSize: 18,
  },
  container2: {
    flex: 1,
    borderColor : '#6B21A8',
    backgroundColor: '#FAF5FF',
    borderWidth: 3,
    borderRadius: 10,

  }
});
