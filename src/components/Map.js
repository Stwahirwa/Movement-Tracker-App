import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { ActivityIndicator } from "react-native";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  /**  
EXPERIMENTAL CODE FOR CREATING RANDOM LOCATIONS ON A MAP
 let points = [];
     
 for (let i = 0; i < 20; i++) {
  if (i % 2 === 0) {
    points.push({
      latitude: 37.33233 + i * 0.001,
      longitude: -122.03121 + i * 0.001,
    });
  } else {
    points.push({
      latitude: 37.33233 - i * 0.002,
      longitude: -122.03121 - i * 0.001,
    });
  }
}
 
 */

  const { state } = useContext(LocationContext);
  const { currentLocation } = state;
  console.log(state);
  console.log(currentLocation);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  //console.log(state);

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158,158,255,1.00)"
        fillColor="rgba(158,158,255,0.3)"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default Map;
