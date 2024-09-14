import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  Logo: {
    width: 100,
    height: 100,
    opacity: 0.5,
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    flex: 1,
    // borderColor: "red",
    // borderWidth: 2,
    boxsizing: "border-box",
  },
  map: {
    flex: 1,
  },
  requestContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    color: "black",
  },
  vehicleImage: {
    width: 50,
    height: 35,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 8,
  },

  RequestText: {
   
    
    fontSize: 16,
    color: "black",
  },
  RequestContainer:{
    flexDirection: "column",
    // alignItems: "center",
  },
  LocationMarkImage: {
    width: 20,
    height: 20,
    // marginLeft: 10,
    // marginRight: 10,
  },
  pickupContainer: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  DropoffContainer: {
    flexDirection: "row",
    alignItems: "center",
    color: "blue",
  },
});

export default style;
