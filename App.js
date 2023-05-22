import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import MyEventsScreen from "./screens/MyEventsScreen";
import EventScreen from "./screens/EventScreen";
import CreateScreen from "./screens/CreateScreen";
import ProfilScreen from "./screens/ProfilScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import * as Font from "expo-font";

import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import user from "./reducers/user";
import event from "./reducers/event";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "bega",
  storage: AsyncStorage,
  blacklist: ["user"],
};

const reducers = combineReducers({ user, event });

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

//todo tabnavigator for MyEvent

// const EventStackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Event" component={EventScreen} />
//     </Stack.Navigator>
//   );
// };

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          if (route.name === "MyEvents") {
            iconName = "calendar";
          }
          if (route.name === "Create") {
            iconName = "plus";
          } else if (route.name === "Profil") {
            iconName = "user-circle";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6B21A8",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
      })}
    >
      {/* un tab en plus pour afficher l'event, tabBarbutton pour cacher le button dans le tabBar*/}
      {/* <Tab.Screen
        name="EventStackNavigator"
        component={EventStackNavigator}
        options={{ tabBarButton: () => null }}
      /> */}
      <Tab.Screen name="MyEvents" component={MyEventsScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  //*chargement des font
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Inter: require("./assets/fonts/Inter-Regular.ttf"),
        Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
      });
      setIsFontLoaded(true);
    };

    loadFont();
  }, []);

  if (!isFontLoaded) return null;
  //*chargement des font

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* remettre tabnavigator en dernier, juste pour les tests c'est pratique */}
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
            />
            <Stack.Screen name="Event" component={EventScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
