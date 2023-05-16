import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";
import FontAwesome, {
  RegularIcons,
} from "react-native-vector-icons/FontAwesome";

const EventComponent = (props) => {
  return (
    <View style={styles.eventContainer}>
      <Text style={styles.eventTitle}>{props.eventName}</Text>
      <Text style={styles.date}>{props.date}</Text>
      <KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.buttonInfos}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("EventStackNavigator", { screen: "Event" })
          }
        >
          <Text style={styles.textButtonInfos}>Infos</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default function EventScreen({ navigation }) {
  const [search, setSearch] = useState("");

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>My Events</Text>
        <KeyboardAvoidingView style={{ width: "100%" }}>
          <TextInput
            onChangeText={(value) => setSearch(value)}
            value={search}
            style={styles.input}
            placeholder="search events"
          />
        </KeyboardAvoidingView>
        <EventComponent eventName={'Event Name'} date={'date'}/>
        <KeyboardAvoidingView>
          <TouchableOpacity
            style={styles.buttonEventsPassés}
            activeOpacity={0.8}
            // onPress={() => }
          >
            <Text style={styles.textButtonEventsPassés}>Events Passés</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF5FF",
    alignItems: "center",
    paddingTop: 60,
  },
  title: {
    width: "100%",
    fontSize: 48,
    fontWeight: 600,
    fontFamily: "roboto",
    textAlign: "center",
  },
  input: {
    width: "90%",
    marginHorizontal: "5%",
    padding: 10,
    marginBottom: 50,
    height: 40,
    marginTop: 25,
    backgroundColor: "#ffff",
    fontSize: 18,
  },
  eventContainer: {
    display: "flex",
    borderColor: "#6B21A8",
    backgroundColor: "#FAF5FF",
    borderWidth: 3,
    borderRadius: 10,
    padding: 40,
  },
  buttonInfos: {
    backgroundColor: "#6B21A8",
    borderRadius: 10,
    marginBottom: 2,
    marginLeft: 10,
    width: "80%",
    paddingTop: 8,
    alignItems: "center",
    display: "flex",
    marginTop: 40,
  },
  textButtonInfos: {
    color: "#DDA304",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
  eventTitle: {
    width: "100%",
    fontSize: 20,
    fontWeight: 500,
    fontFamily: "Inter",
    textAlign: "center",
  },
  date: {
    width: "100%",
    fontSize: 16,
    fontWeight: 400,
    fontFamily: "Regular",
    textAlign: "center",
    marginTop: 40,
    marginLeft: 45,
  },
});
