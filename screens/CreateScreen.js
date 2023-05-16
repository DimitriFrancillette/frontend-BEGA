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
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CreateScreen({ navigation }) {
  const [nameEvent, setNameEvent] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const toggleDatepicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatepicker();
        setDate(currentDate);
      }
    } else {
      toggleDatepicker();
    }
  };
  const confirmIOSDate = () => {
    toggleDatepicker();
  };

  const handleTimeChange = (event, selected) => {
    const currentTime = selected || selectedTime;
    setShowTimePicker(false);
    setSelectedTime(currentTime);
  };

  const showPicker = () => {
    setShowTimePicker(true);
  };


  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Création de l'évènement</Text>

        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(value) => setNameEvent(value)}
            value={nameEvent}
            style={styles.input}
            placeholder="nom de l'évènement"
          />
          {/* <Text style={styles.dateTitle}> DATE </Text> */}
          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChange}
              minimumDate={new Date()}
            />
          )}
          {showPicker && Platform.OS === "ios" && (
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.pickerButton,
                  { backgroundColor: "#6B21A8" },
                ]}
                onPress={toggleDatepicker}
              >
                <Text style={[styles.buttonText, { color: "#DDA304" }]}>
                  Annuler
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.pickerButton, {backgroundColor: "#6B21A8"}]}
                onPress={confirmIOSDate}
              >
                <Text style={[styles.buttonText]}>Valider</Text>
              </TouchableOpacity>
            </View>
          )}
          {!showPicker && (
            <Pressable onPress={toggleDatepicker}>
              <TextInput
                style={styles.input}
                value={date}
                onChangeText={setDate}
                placeholderTextColor="red"
                editable={false}
                onPressIn={toggleDatepicker}
              />
            </Pressable>
          )}
        </View>
        <View>
      <Button title="Select Time" onPress={showPicker} />
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF5FF",
    paddingTop: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: 600,
    fontFamily: "roboto",
    textAlign: "center",
  },
  inputContainer:{
    alignItems:"center",
  },
  input:{
    fontSize: 20,
    marginTop : 20,
    marginBottom: 10,
  },
  dateTitle:{
    fontSize: 20,
    fontWeight: 500,
    fontFamily: "roboto",
    textAlign: "right",
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
});
