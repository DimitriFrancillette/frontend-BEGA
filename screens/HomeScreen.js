import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function HomeScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image style={styles.logo} source={require("../assets/logo-bega.png")} />
      
      <TouchableOpacity
        style={styles.buttonSignIn}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.textButton}>Connection</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSignUp}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.textButton}>Créer un compte </Text>
      </TouchableOpacity>
    <View style={styles.reseau} >
      <TouchableOpacity
        style={styles.buttonFacebook}
        activeOpacity={0.8} >
        <Image style={styles.logoFacebook} source={require("../assets/facebook-logo.png")} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonGoogle}
        activeOpacity={0.8} >
       <Image style={styles.logoGoogle} source={require("../assets/google-logo.png")} />
      </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#7935b0",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  logo: {
    width: "100%",
    height: "40%",
  },
  buttonSignIn: {
    backgroundColor: '#6B21A8',
    borderRadius: 10,
   marginBottom: 80,
   width: '80%',
   marginTop: 60,
   paddingTop: 8,
   alignItems: 'center',
   display: 'flex',
   marginBottom: 50,
  },
  buttonSignUp: {
    backgroundColor: '#6B21A8',
    borderRadius: 10,
   marginBottom: 80,
   width: '80%',
   marginTop: 5,
   paddingTop: 8,
   alignItems: 'center',
   display: 'flex',
   marginBottom: 80,
  },
  textButton: {
    color: '#DDA304',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
  reseau:{
    display: 'flex',
    flexDirection: 'row',

  }, 
  logoFacebook:{
    width: 100,
    height: 120,
    marginBottom: 20,
  },
  logoGoogle:{
    width: 75,
    height: 75,
    marginBottom: 1,
  },
  buttonGoogle:{
    height: 60, 
   alignItems: 'center',
   display: 'flex',
   marginTop: 25,
 
  }
});

