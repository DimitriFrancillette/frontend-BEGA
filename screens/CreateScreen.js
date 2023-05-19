import React from "react";
import { BACK_API } from "@env";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../reducers/event";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CreateScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [nameEvent, setNameEvent] = useState("");
  const [adressEvent, setAdressEvent] = useState(null);
  const [descriptionEvent, setDescriptionEvent] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);



  const handleDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const showPickerDate = () => {
    setShowDatePicker(true);
  };

  const handleTimeChange = (event, selected) => {
    const currentTime = selected || selectedTime;
    setShowTimePicker(false);
    setSelectedTime(currentTime);
  };

  const showPickerTime = () => {
    setShowTimePicker(true);
  };
  //  display the selected time in a consistent format, single-digit minutes are correctly displayed with a leading zero.
  const formatTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  const handleSubmit = () => {
    // if (
    //   !nameEvent ||
    //   !selectedDate ||
    //   !selectedTime||
    //   !adressEvent ||
    //   !descriptionEvent
    // ) {
    //   setError("merci de compléter tous les champs ");
    //   setSubmitted(true);

    //   return;
    // }

    fetch(`http://192.168.1.32:3000/events/addevent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: nameEvent,
        // title, location, description, userId, role
        //todo gestion userId, add back date and time
        //date: selectedDate,
        //time: selectedTime,
        role: "admin",
        userId: user.userId,
        location: adressEvent,
        description: descriptionEvent,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.result === false) {
          return;
        }

        const newEvent = {
          title: data.title,
          //date: data.event.selectedDate,
          //time: data.event.selectedTime,
          location: data.location,
          description: data.description,
        };
        
        dispatch(addEvent(newEvent));

        // setNameEvent("");
        //setSelectedDate(new Date());
        //setSelectedTime(new Date());
        // setAdressEvent(null);
        // setDescriptionEvent("");

        navigation.navigate("EventStackNavigator", {
          screen: "Event",
          params: {
            eventId: data.saveEvent._id,
          },
        });
      });

  };
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Création de l'évènement</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(value) => setNameEvent(value)}
            value={nameEvent}
            style={styles.inputNameEvent}
            placeholder="nom de l'évènement"
          />
          <View style={styles.dateEvent}>
            <TouchableOpacity
              onPress={showPickerDate}
              style={styles.buttonDateTime}
            >
              <Text>Date de l'évènement</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                is24Hour={true}
                onChange={handleDateChange}
                style={styles.dateTimePicker}
              />
            )}
            <Text> {selectedDate.toDateString()}</Text>
          </View>
          <View style={styles.timeEvent}>
            <TouchableOpacity
              onPress={showPickerTime}
              style={styles.buttonDateTime}
            >
              <Text>Heure de l'évènement</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={selectedTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={handleTimeChange}
                style={styles.dateTimePicker}
              />
            )}
            <Text> {formatTime(selectedTime)}</Text>
          </View>
          <TextInput
            onChangeText={(value) => setAdressEvent(value)}
            value={adressEvent}
            style={styles.inputAdressEvent}
            placeholder="lieu de l'évènement"
          />
          <TextInput
            onChangeText={(value) => setDescriptionEvent(value)}
            value={descriptionEvent}
            style={styles.inputAdressEvent}
            placeholder="Description de l'évènement"
            multiline={true}
            maxLength={280}
          />
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.buttonAddFriends}
              activeOpacity={0.8}
            // onPress={() => }
            >
              <Text style={styles.textButtonAddFriends}> + invités</Text>
            </TouchableOpacity>
          </View>
          {submitted &&
            (!nameEvent ||
              !adressEvent ||
              !descriptionEvent ||
              !selectedDate ||
              !selectedTime) && <Text style={styles.error}>{error}</Text>}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.buttonValid}
        activeOpacity={0.8}
        onPress={handleSubmit}
      >
        <Text style={styles.textButtonValid}> Valider </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF5FF",
    paddingTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: 600,
    fontFamily: "Roboto",
    textAlign: "center",
    color: "black",
  },
  inputContainer: {
    alignItems: "center",
  },
  inputNameEvent: {
    fontSize: 25,
    marginTop: 20,
    marginBottom: 10,
  },
  dateEvent: {
    width: 200,
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#FAF5FF",
    flex: 1,
    alignItems: "center",
  },
  timeEvent: {
    width: 200,
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#FAF5FF",
    flex: 1,
    alignItems: "center",
  },
  inputAdressEvent: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    overflow: "hidden",
    flex: 1,
  },
  buttonDateTime: {
    alignItems: "center",
    backgroundColor: "#FAF5FF",
    borderRadius: 10,
    borderColor: "#6B21A8",
    borderWidth: 0.6,
    padding: 10,
    marginBottom: 10,
  },
  buttonAddFriends: {
    backgroundColor: "#FAF5FF",
    borderRadius: 10,
    borderColor: "#6B21A8",
    borderWidth: 2,
    marginBottom: 50,
    marginLeft: 8,
    marginRight: 190,
    width: "25%",
    paddingTop: 8,
    alignItems: "center",
    display: "flex",
    marginTop: 40,
  },
  textButtonAddFriends: {
    color: "#6B21A8",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
  buttonValid: {
    backgroundColor: "#6B21A8",
    borderRadius: 10,
    borderColor: "#DDA304",
    borderWidth: 1,
    marginLeft: 10,
    width: "60%",
    paddingTop: 8,
    alignItems: "center",
    display: "flex",
    position: "absolute",
    bottom: 20,
  },
  textButtonValid: {
    color: "#DDA304",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
