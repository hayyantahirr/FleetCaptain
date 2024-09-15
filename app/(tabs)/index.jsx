import { View, TextInput, Text, TouchableOpacity, Image } from "react-native"; // Core components for UI
import MapView, { Marker } from "react-native-maps"; // Map component and Marker for pinning locations
import * as Location from "expo-location"; // Location services from Expo
import { useEffect, useState } from "react"; // React hooks for managing state and side effects
import style from "../../styles/home-css"; // Importing custom styles for this screen
import { db } from "../../config/firebase"; // Importing Firebase database
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ScrollView } from "react-native";
export default function HomeScreen() {
  const [ride, setRide] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null); // State to store any error message related to location access
  const [location, setLocation] = useState(null); // State to store the current location
  const [rideIndex, setRideIndex] = useState(0);
  useEffect(() => {
    getLocationPermision();
    realtimeData();
  }, []);
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
    const q = query(
      collection(db, "RidesInfo"),
      where("status", "==", "Pending")
    );
    onSnapshot(q, (querySnapshot) => {
      const rides = [];
      querySnapshot.forEach((doc) => {
        rides.push(doc.data());
      });
      setRide([...rides]);
      console.log("Current rides: ", rides);
      console.log("saved ride ", ride);
    });
  }
  async function accept() {

    
  }
  // function nextRide(){
  //   if (rideIndex !== ride.length - 1) {
  //     setRideIndex(rideIndex + 1);
  //   }else{
  //     setRide([])
  //   }
  // }
  return (
    <>
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
              {ride.map((item) => {
                console.log("mapped longitude item", item.Pickuplongitude);
                return (
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
                );
              })}
            </MapView>
          )}
        </View>
        <View style={style.requestContainer}>
          <Text style={style.WelcomeText}>Welcome Captain !</Text>

          {ride.map((item) => {
            // console.log("mapped item", item.dropoffLocationName);
            return (
              <ScrollView showsVerticalScrollIndicator={false}>
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
                  <View style={style.ButtonConatiner}>
                    <TouchableOpacity style={style.Accept}>
                      <Text style={style.AcceptText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.Reject}>
                      <Text style={style.RejectText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            );
          })}
        </View>
      </View>
    </>
  );
}
