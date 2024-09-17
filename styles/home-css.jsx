import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  WelcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  vehicle: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  Logo: {
    width: 100,
    height: 40,
    opacity: 0.85,
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
  RequestContainerOg: {
    borderColor: "#62929E",
    borderWidth: 1,
    borderRadius: 30,
  },
  InfoContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  fare: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginBottom: 10,
  },
  distance: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginBottom: 10,
  },
  ButtonConatiner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  Accept: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
    marginBottom: 10,
  },
  AcceptText: {
    color: "white",
    fontSize: 16,
  },
  Reject: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 10,
  },
  RejectText: {
    color: "white",
    fontSize: 16,
  },
  RequestText: {
    fontSize: 16,
    color: "black",
  },
  RequestContainer: {
    flexDirection: "column",
    // alignItems: "center",
  },
  LocationMarkImage: {
    width: 20,
    height: 20,
    // marginLeft: 10,
    marginRight: 10,
  },
  PickupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  DropoffContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginLeft: "auto",
    marginRight: "auto",
  },
  noRideText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default style;
