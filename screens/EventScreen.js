import { View, Text, StyleSheet } from "react-native";

export default function EventScreen({ navigation }) {
    return (
        <View style={styles.container}> 
            <Text style={styles.title}>Nom de l'event </Text>
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
            fontSize: 38,
            fontWeight: 600,
            fontFamily: "Roboto",
            textAlign: "center",
          },
    });