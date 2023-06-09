import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../reducers/event";
import { BACKEND_URL } from "../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import ToastManager, { Toast } from "toastify-react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function CreateScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const showToasts = () => {
    Toast.success("Amis ajouté");
  };
  const badToast = () => {
    Toast.error("Impossible à ajouter");
  };

  const [nameEvent, setNameEvent] = useState("");
  const [adressEvent, setAdressEvent] = useState(null);
  const [descriptionEvent, setDescriptionEvent] = useState("");
  const [datePickerValue, setdatePickerValue] = useState(new Date());
  const [timePickerValue, setTimePickerValue] = useState(new Date());
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [emailInvitation, setEmailInvitation] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [friends, setFriends] = useState([]);
  const [participants, setParticipants] = useState([]);

  const handleDateChange = (event) => {
    const timestamp = event.nativeEvent.timestamp;
    dateOfChoice = new Date(timestamp);

    setShowDatePicker(false);
    setdatePickerValue(dateOfChoice);
  };

  // ne pas mettre event.preventDefault car ne fonctionnne pas en reactnative mais en web yes

  const handleTimeChange = (event) => {
    const timestamp = event.nativeEvent.timestamp;
    dateOfChoice = new Date(timestamp);

    setShowTimePicker(false);
    setTimePickerValue(dateOfChoice);
  };

  const combineTime = (dateTimestamp, timeTimestamp) => {
    const date = new Date(dateTimestamp);
    const time = new Date(timeTimestamp);

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const hours = time.getHours();
    const minutes = time.getMinutes();

    const combinedTimestamp = new Date(year, month, day, hours, minutes);

    return combinedTimestamp.getTime();
  };

  //  display the selected time in a consistent format, single-digit minutes are correctly displayed with a leading zero.
  // const formatTime = (time) => {
  //   const hours = time.getHours();
  //   const minutes = time.getMinutes();
  //   return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  // };

  const handleSubmit = () => {
    if (nameEvent === "" || adressEvent === "" || descriptionEvent === "") {
      setError("merci de compléter tous les champs ");
      setSubmitted(true);
      return;
    }

    const eventTimestamp = combineTime(datePickerValue, timePickerValue);

    fetch(`${BACKEND_URL}/events/addevent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: nameEvent,
        date: eventTimestamp,
        participants: participants,
        role: "admin",
        userId: user.userId,
        location: adressEvent,
        description: descriptionEvent,
      }),
    })
      .then((response) => response.json())
      .then((createdEventData) => {
        console.log("RETOUR CREA EVENT", createdEventData);
        if (createdEventData.result === false) {
          return;
        }

        const newEvent = {
          title: createdEventData.title,
          location: createdEventData.location,
          description: createdEventData.description,
        };

        fetch(`${BACKEND_URL}/strongbox/createstrongbox`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            creatorId: user.userId,
            eventId: createdEventData.saveEvent._id,
          }),
        })
          .then((response) => response.json())
          .then((createdStrongboxData) => {
            if (createdStrongboxData.result === false) {
              return;
            }
            dispatch(addEvent(newEvent));

            navigation.navigate("Event", {
              eventId: createdEventData.saveEvent._id,
            });
            setNameEvent("");
            setdatePickerValue(new Date());
            setTimePickerValue(new Date());
            setAdressEvent(null);
            setDescriptionEvent("");
          });
      });
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  //FRIENDS

  const showGuests = () => {
    setShowModal(!showModal);
    fetch(`${BACKEND_URL}/users/getfriends/${user.userId}`)
      .then((response) => response.json())
      .then((data) => {
        setFriends(data.user.friends);
      });
  };

  let friendsList = friends.map((data, i) => {
    let inviteIcon = "user-plus";

    const invited = participants.includes(data._id);

    !invited ? inviteIcon = "user-plus" : inviteIcon = "minus";
    return (
      <View style={styles.friendContainer} key={i}>
        <Text onPress={() => handleGuest(data._id)} style={styles.participant}>
          {data.firstname}
        </Text>
        <FontAwesome onPress={() => handleGuest(data._id)} name={inviteIcon} size={30} color="#6B21A8" />
      </View>
    );
  });

  const handleGuest = (guestId) => {
    console.log(guestId);

    const invited = participants.includes(guestId);
    // const invited = participants.some( e => e.userId = guestId);

    if (!invited) {
      setParticipants([...participants, guestId]);
      console.log("ADDED");
      showToasts();
    } else {
      setParticipants(participants.filter((e) => e !== guestId));
      console.log("REMOVED");
      badToast();
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Création de l'évènement</Text>
            <TextInput
              onChangeText={(value) => setNameEvent(value)}
              value={nameEvent}
              style={styles.inputNameEvent}
              placeholder="Nom de l'évènement"
            />
            <View style={styles.dateEvent}>
              <Text
                onPress={() => showDatepicker()}
                style={styles.dateEventText}
              >
                Date: {datePickerValue.toLocaleDateString()}
              </Text>
              {showDatePicker && (
                <DateTimePicker
                  value={datePickerValue}
                  mode="date"
                  display="default"
                  is24Hour={true}
                  onChange={handleDateChange}
                  minimumDate={new Date(Date.now())}
                  style={styles.dateTimePicker}
                />
              )}
            </View>
            <View style={styles.timeEvent}>
              <Text
                onPress={() => showTimepicker()}
                style={styles.timeEventText}
              >
                Heure:
                {(timePickerValue.getHours() < 10 ? "0" : "") +
                  timePickerValue.getHours()}
                :
                {(timePickerValue.getMinutes() < 10 ? "0" : "") +
                  timePickerValue.getMinutes()}
              </Text>
              {showTimePicker && (
                <DateTimePicker
                  value={timePickerValue}
                  mode="time"
                  display="default"
                  is24Hour={true}
                  onChange={handleTimeChange}
                  style={styles.dateTimePicker}
                />
              )}
            </View>
            <TextInput
              onChangeText={(value) => setAdressEvent(value)}
              value={adressEvent}
              style={styles.inputAdressEvent}
              placeholder="Lieu de l'évènement"
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
              <SafeAreaView style={{ flex: 1 }}>
                <Modal
                  animationType={"slide"}
                  transparent={false}
                  visible={showModal}
                  onRequestClose={() => {
                    console.log("Modal has been closed.");
                  }}
                >
                  <View style={styles.modal}>
                  <Text style={styles.title}> Liste d'amis</Text>
                    {/* <TextInput
                      onChangeText={(value) => setEmailInvitation(value)}
                      value={emailInvitation}
                      style={styles.inputEmailInvitation}
                      placeholder="email de l'invité"
                      placeholderTextColor="#c0c0c0"
                    />
                    <View style={styles.closeButton}>
                      <Button
                        color="#841584"
                        title="X"
                        onPress={() => {
                          setShowModal(!showModal);
                        }}
                      />
                    </View> */}

                    {friendsList}

                    <TouchableOpacity
                      style={styles.modalValidButton}
                      activeOpacity={0.8}
                      onPress={() => {
                        setShowModal(!showModal);
                      }}
                    >
                      <Text style={styles.textButtonValid}> Valider </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </SafeAreaView>
              <TouchableOpacity
                style={styles.buttonAddFriends}
                activeOpacity={0.8}
                onPress={() => {
                  showGuests();
                }}
              >
                <Text style={styles.textButtonAddFriends}> + invités</Text>
              </TouchableOpacity>
            </View>
            {submitted &&
              (!nameEvent ||
                !adressEvent ||
                !descriptionEvent ||
                !datePickerValue ||
                !timePickerValue) && <Text style={styles.error}>{error}</Text>}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.buttonValid}
        activeOpacity={0.8}
        onPress={handleSubmit}
      >
        <Text style={styles.textButtonValid}> Valider </Text>
      </TouchableOpacity>
      <ToastManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF5FF",
    paddingTop: 40,
    alignItems: "center",
    width: "100%",
  },

  scrollView: {
    width: "100%",
    flexGrow: 1,
  },
  title: {
    fontSize: 48,
    fontWeight: 600,
    fontFamily: "Roboto",
    textAlign: "center",
    color: "black",
  },
  inputContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
    width: "100%",
  },
  inputNameEvent: {
    fontSize: 25,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    width: "99%",
    borderColor: "#6B21A8",
    alignItems: "center",
    padding: 10,
  },
  dateEvent: {
    width: "100%",
    borderColor: "#6B21A8",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    alignItems: "center",
  },
  dateEventText: {
    fontSize: 25,
    marginBottom: 10,
  },

  timeEvent: {
    width: "100%",
    borderColor: "#6B21A8",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    alignItems: "center",
  },
  timeEventText: {
    fontSize: 25,
    marginBottom: 10,
  },
  inputAdressEvent: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    overflow: "hidden",
    flex: 1,
    marginBottom: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    width: "99%",
    borderColor: "#6B21A8",
    alignItems: "center",
    padding: 10,
  },
  inputDescEvent: {
    marginTop: 5,
    fontSize: 20,
    overflow: "hidden",
    flex: 1,
    marginBottom: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    width: "99%",
    borderColor: "#6B21A8",
    alignItems: "center",
    padding: 40,
    paddingLeft: 0,
  },
  buttonAddFriends: {
    borderRadius: 10,
    borderColor: "#6B21A8",
    borderWidth: 2,
    marginBottom: 40,
    marginLeft: 8,
    marginRight: 190,
    width: "30%",
    paddingTop: 8,
    alignItems: "center",
    display: "flex",
    marginTop: 10,
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
    width: "100%",
  },
  error: {
    color: "#DDA304",
    marginBottom: 10,
  },
  dateTimePicker: {
    borderRadius: 0,
    color: "#DDA304",
  },
  modal: {
    // flex: 1,
    alignItems: "center",
    backgroundColor: "#FAF5FF",
    paddingTop: 30,
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 30,
  },
  modalValidButton: {
    backgroundColor: "#6B21A8",
    borderRadius: 10,
    borderColor: "#DDA304",
    borderWidth: 1,
    paddingTop: 8,
    alignItems: "center",
    position: "absolute",
    bottom: 70,
    paddingHorizontal: 40,
  },
  inputEmailInvitation: {
    fontSize: 25,
    marginTop: 80,
    borderWidth: 0.5,
    borderRadius: 5,
    width: "99%",
    borderColor: "#6B21A8",
    alignItems: "center",
    padding: 10,
    color: "black",
  },
  participant: {
    fontSize: 30,
    margin: 10,
  },
  friendContainer: {
    marginTop: 20,
    width:'70%',
    borderColor: "#DDA304",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    paddingLeft:10,
    paddingRight:10,
    justifyContent: 'space-between',
    alignItems: "center",
  }
});
