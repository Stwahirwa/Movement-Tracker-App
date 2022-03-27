import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Map from "../src/components/Map";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
//import { NavigationEvents } from "react-navigation"; NB: This is for navigating away from Screens!
import "../src/_mockLocation";
import { Context as LocationContext } from "../src/context/LocationContext";
import useLocation from "../src/hooks/useLocation";
import TrackForm from "../src/components/TrackForm";

const TrackCreateScreen = ({ isFocused }) => {
  const { addLocation } = useContext(LocationContext);
  console.log("isFocused", isFocused);

  // const[err] =useLocation((location)=>{addLocation(location)})
  // OR
  const [err] = useLocation(isFocused, addLocation);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2> Create a Track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
