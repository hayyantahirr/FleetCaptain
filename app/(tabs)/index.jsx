import { View, TextInput, Text, TouchableOpacity, Image } from "react-native"; // Core components for UI
import MapView, { Marker } from "react-native-maps"; // Map component and Marker for pinning locations
import * as Location from "expo-location"; // Location services from Expo
import { useEffect, useState } from "react"; // React hooks for managing state and side effects
import style from "../../styles/home-css"; // Importing custom styles for this screen
import { db } from "../../config/firebase"; // Importing Firebase database
import { collection, onSnapshot, query, where } from "firebase/firestore";
export default function HomeScreen() {
  useEffect(() => {
    getLocationPermision();
    realtimeData();
  });
  function getLocationPermision() {
    (async () => {
      // Request permission to access location in the foreground
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // If permission is not granted, set an error message and stop the function
        setErrorMsg("Permission to access location was denied");
        return;
      }
      // Options to set the accuracy and distance interval for location tracking
      const options = {
        accuracy: 4, // Accuracy level of location
        distanceInterval: 1, // Minimum distance (in meters) between location updates
      };
      // Watch the user's location and update the location state when the position changes
      Location.watchPositionAsync(options, (location) => {
        setLocation(location); // Set the current location to state
      });
    })();
  }
  function realtimeData() {
    const q = query(collection(db, "cities"), where("state", "==", "CA"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data().name);
      });
      console.log("Current cities in CA: ", cities.join(", "));
    });
  }
  return (
    <>
      <View style={style.container}>
        <View style={style.map}>
          <MapView style={style.map}></MapView>
        </View>
        <View style={style.inputContainer}>
          <Text>Welcome Captain !</Text>
          <TextInput style={style.input} placeholder="Search" />
        </View>
      </View>
    </>
  );
}
