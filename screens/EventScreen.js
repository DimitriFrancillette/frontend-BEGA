import { View, Text, StyleSheet,TouchableOpacity } from "react-native";

export default function EventScreen({route, navigation}) {

    return (
        <View style={styles.container}> 
            <Text style={styles.title}>{route.params.nameEvent} </Text>  
            <Text style={styles.location}>{route.params.adressEvent} </Text>
            <Text style={styles.adress}>{route.params.descriptionEvent} </Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.ButtonAddFriends}
                activeOpacity={0.8}
                // onPress={() => }
              >
                <Text style={styles.textButtonAddFriends}> + invités</Text>
              </TouchableOpacity>
            </View>
        </View>
    )}

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
            fontFamily: "Roboto",
            textAlign: "center",
          },
          location: {
            width: "100%",
            fontSize: 25,
            fontWeight: 500,
            fontFamily: "Roboto",
            textAlign: "center",
          },
          adress: {
            width: "100%",
            fontSize: 18,
            fontWeight: 500,
            fontFamily: "Roboto",
            textAlign: "center",
          },
          ButtonAddFriends: {
            backgroundColor: "#6B21A8",
            borderRadius: 10,
            borderWidth: 1,
            marginBottom: 2,
            marginLeft: 10,
            width: "60%",
            paddingTop: 8,
            alignItems: "center",
            display: "flex",
            marginTop: 200,
          },
          textButtonAddFriends: {
            color: "#DDA304",
            height: 30,
            fontWeight: "600",
            fontSize: 16,
          },
    });