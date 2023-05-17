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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  

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
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
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
          <View>
            <Button title="Select Date" onPress={showPickerDate} />
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
      <Text>Date de l'évènement: {selectedDate.toDateString()}</Text>
            
          </View>
         
        </View>
        <View>
          <Button title="Select Time" onPress={showPickerTime} />
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )}
          <Text>Selected Time: {formatTime(selectedTime)}</Text>
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
  inputContainer: {
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  dateTitle: {
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
