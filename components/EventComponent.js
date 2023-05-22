import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const EventComponent = ({ eventName, description, eventId }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.eventContainer}>
      <Text style={styles.eventTitle}>{eventName}</Text>
      {/* <Text style={styles.date}>
          {props.date.toLocaleString("fr-FR", {
            weekday: "short",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text> */}
      <KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.buttonInfos}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Event", { eventId })}
        >
          <Text style={styles.textButtonInfos}>Infos</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF5FF",
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 600,
    fontFamily: "Roboto",
    textAlign: "center",
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
  eventContainer: {
    width: "45%",
    display: "flex",
    borderColor: "#6B21A8",
    backgroundColor: "#FAF5FF",
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: "2.5%",
    marginBottom: 20,
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
    fontFamily: "Inter",
    textAlign: "center",
    marginTop: 40,
  },
  textButtonPastEvents: {
    color: "#FAF5FF",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  buttonPastEvents: {
    top: 60,
    left: 20,
    width: 42,
    backgroundColor: "#DDA304",
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  eventsComponent: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default EventComponent;
