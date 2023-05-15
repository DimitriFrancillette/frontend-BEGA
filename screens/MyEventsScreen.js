import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from "react-native";

import { useState } from "react";
import FontAwesome, {
    RegularIcons,
  } from "react-native-vector-icons/FontAwesome";

export default function EventScreen({ navigation }) {
  const [search, setSearch] = useState("");

  return (
    <>
      <View style={styles.container1}>
        <Text style={styles.title1}>My Events</Text>
        <KeyboardAvoidingView style={{width: "100%"}}>
          <TextInput
            onChangeText={(value) => setSearch(value)}
            value={search}
            style={styles.input}
            placeholder="search events"
          />
        </KeyboardAvoidingView>
        <View style={styles.container2}>
          <Text style={styles.title2}>Event's Name</Text>
          <Text style={styles.date}>Date</Text>
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
  },
  title1: {
    width: "100%",
    fontSize: 48,
    fontWeight: 600,
    fontFamily: "roboto",
    textAlign: 'center'
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
  container2: {
    display: 'flex',
    borderColor : '#6B21A8',
    backgroundColor: '#FAF5FF',
    borderWidth: 3,
    borderRadius: 10,
    padding: 40,
  },
  buttonInfos:{
        backgroundColor: '#6B21A8',
        borderRadius: 10,
       marginBottom:2,
       marginLeft: 10,
       width: '80%',
       paddingTop: 8,
       alignItems: 'center',
       display: 'flex',
       marginTop: 40 ,
      },
textButtonInfos :{
    color: '#DDA304',
    height: 30,
    fontWeight: '600',
    fontSize: 16, 
},
title2: {
    width: "100%",
    fontSize: 20,
    fontWeight: 500,
    fontFamily: "Inter",
    textAlign: 'center'
  },
  date: {
    width: "100%",
    fontSize: 16,
    fontWeight: 400,
    fontFamily: "Regular",
    textAlign: 'center',
    marginTop: 40,
    marginLeft: 45,
  },

});
