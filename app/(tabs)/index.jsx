import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native"; // Core components for UI
import MapView, { Marker } from "react-native-maps"; // Map component and Marker for pinning locations
import * as Location from "expo-location"; // Location services from Expo
import { useEffect, useState } from "react"; // React hooks for managing state and side effects
import style from "../../styles/home-css"; // Importing custom styles for this screen
import { db } from "../../config/firebase"; // Importing Firebase database
import { collection, onSnapshot, query,  where } from "firebase/firestore"; // Firebase Firestore imports

export default function HomeScreen() {
  const [ride, setRide] = useState([]); // State to hold ride information
  const [errorMsg, setErrorMsg] = useState(null); // State to store any error message related to location access
  const [location, setLocation] = useState(null); // State to store the current location
  const [rideIndex, setRideIndex] = useState(0); // State to track current ride index

  useEffect(() => {
    getLocationPermision();
    realtimeData();
  }, []);

  function getLocationPermision() {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const options = {
        accuracy: 4, // Accuracy level of location
        distanceInterval: 1, // Minimum distance (in meters) between location updates
      };
      Location.watchPositionAsync(options, (location) => {
        setLocation(location); // Set the current location to state
      });
    })();
  }

  function realtimeData() {
    const q = query(
      collection(db, "RidesInfo"),
      where("status", "==", "Accepted") // Fetch only accepted rides
    );

    onSnapshot(q, (querySnapshot) => {
      const rides = [];
      querySnapshot.forEach((doc) => {
        let rideData = doc.data();
        rideData.id = doc.id; // Attach document ID to the ride data
        rides.push(rideData);
      });
      setRide(rides); // Update the ride state
      console.log("Current accepted rides: ", rides);
    });
  }

  return (
    <View style={style.container}>
      <View style={style.map}>
        {location && (
          <MapView
            style={style.map}
            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.2,
              longitudeDelta: 0.1,
            }}
          >
            {ride.map((item) => (
              <>
                <Marker
                  coordinate={{
                    latitude: item.Pickuplatitude,
                    longitude: item.Pickuplongitude,
                  }}
                  pinColor="green"
                  title="Pickup Location"
                />
                <Marker
                  coordinate={{
                    latitude: item.Dropofflatitude,
                    longitude: item.dropofflongitude,
                  }}
                  title="Dropoff Location"
                />
              </>
            ))}
          </MapView>
        )}
      </View>
      <View style={style.requestContainer}>
        <Text style={style.WelcomeText}>Welcome Captain!</Text>
        {ride.length > 0 ? (
          ride.map((item) => (
            <ScrollView key={item.id} showsVerticalScrollIndicator={false}>
              <View style={style.RequestContainerOg}>
                <View style={style.vehicleContainer}>
                  <Text style={style.vehicle}>
                    Vehicle Requested : {item.vehicle}
                  </Text>
                </View>
                <View style={style.PickupContainer}>
                  <Image
                    source={require("../../assets/GoFleet Images/greenLocation.png")}
                    style={style.LocationMarkImage}
                  />
                  <Text style={style.RequestText}>
                    {item.pickupLocationName}
                  </Text>
                </View>
                <View style={style.DropoffContainer}>
                  <Image
                    source={require("../../assets/GoFleet Images/redLocation.png")}
                    style={style.LocationMarkImage}
                  />
                  <Text style={style.RequestText}>
                    {item.dropoffLocationName}
                  </Text>
                </View>
                <View style={style.InfoContainer}>
                  <Text style={style.fare}>Fare : {item.fare}</Text>
                  <Text style={style.status}>Status : {item.status}</Text>
                  <Text style={style.distance}>
                    Distance : {Math.round(item.distance)} KM
                  </Text>
                </View>
              </View>
            </ScrollView>
          ))
        ) : (
          <Text style={style.noRideText}>No accepted rides at the moment</Text>
        )}
      </View>
    </View>
  );
}
