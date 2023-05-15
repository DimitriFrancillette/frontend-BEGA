import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import LogInScreen from './screens/LogInScreen';
import SignInScreen from './screens/SignInScreen';
//import EventScreen from './screens/EventScreen';

import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import user from './reducers/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: "bega",
  storage: AsyncStorage,
};

const reducers = combineReducers({ user });

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//todo tabnavigator for MyEvent

export default function App() {
  return (
    <Provider store={store}>
       <PersistGate persistor={persistor}>
       <NavigationContainer>
       <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="LogIn" component={LogInScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            {/* <Stack.Screen name="TabNavigator" component={TabNavigator} /> */}
          </Stack.Navigator>
    </NavigationContainer>
    </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
