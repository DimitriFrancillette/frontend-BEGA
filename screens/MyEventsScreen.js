import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import EventComponent from "../components/EventComponent";
import FirstMessage from "../components/FirstMessage";
import { useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../constants";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function MyEventsScreen({}) {
  const [search, setSearch] = useState("");
  const [eventsData, setEventsData] = useState([]);
  const user = useSelector((state) => state.user.value);
  const [eventsFiltered, setEventsFiltered] = useState(eventsData);
  const [orderDate, setOrderDate] = useState(true);

  const filterEvents = (value) => {
    setSearch(value);
    let filter = eventsData.filter((e) => {
      return e.title.includes(value);
    });
    setEventsFiltered(filter);
  };

  const handleOrdersDateByNew = () => {
    setEventsFiltered(
      eventsData.sort((a, b) => new Date(b.date) - new Date(a.date))
    );
    setOrderDate(!orderDate);
  };

  const handleOrdersDateByOld = () => {
    setEventsFiltered(
      eventsData.sort((a, b) => new Date(a.date) - new Date(b.date))
    );
    setOrderDate(!orderDate);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchEvents = fetch(
        `${BACKEND_URL}/events/findallevents/${user.userId}`
      )
        .then((response) => response.json())
        .then((data) => {
          data.events.sort((a, b) => new Date(a.date) - new Date(b.date));
          setEventsData(data.events);
        });

      return () => fetchEvents;
    }, [])
  );

  const handleDelete = (eventId) => {
    fetch(`${BACKEND_URL}/events/deleteevent`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setEventsData(eventsData.filter((e) => e._id !== eventId));
      });
  };

  let events = [];
  if (eventsFiltered.length > 0) {
    events = eventsFiltered.map((data, i) => {
      return (
        <EventComponent
          key={i}
          eventName={data.title}
          date={data.date}
          description={data.description}
          eventId={data._id}
          handleDelete={handleDelete}
          //navigation={navigation}
        />
      );
    });
  } else {
    events = eventsData.map((data, i) => {
      return (
        <EventComponent
          key={i}
          eventName={data.title}
          date={data.date}
          description={data.description}
          eventId={data._id}
          handleDelete={handleDelete}
          //navigation={navigation}
        />
      );
    });
  }

  return (
    <>
      <ScrollView style={styles.scrollView} stickyHeaderIndices={[0]}>
        {orderDate ? (
          <TouchableOpacity
            style={styles.buttonPastEvents}
            activeOpacity={0.8}
            onPress={handleOrdersDateByNew}
          >
            <FontAwesome name="arrow-down" size={28} color="#6B21A8" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttonPastEvents}
            activeOpacity={0.8}
            onPress={handleOrdersDateByOld}
          >
            <FontAwesome name="arrow-up" size={28} color="#6B21A8" />
          </TouchableOpacity>
        )}

        <View style={{ backgroundColor: "#FAF5FF" }}>
          <Text style={styles.title}>Mes Events</Text>
          <KeyboardAvoidingView style={{ width: "100%" }}>
            <TextInput
              onChangeText={(value) => filterEvents(value)}
              value={search}
              style={styles.input}
              placeholder="Chercher un évènement"
            />
          </KeyboardAvoidingView>
        </View>

        <View style={styles.container}>
          <View style={styles.eventsComponent}>
            {eventsData.length === 0 ? <FirstMessage /> : events}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

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
    marginTop: 40,
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
    top: 50,
    left: 10,
    width: 42,
    height: 42,
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
