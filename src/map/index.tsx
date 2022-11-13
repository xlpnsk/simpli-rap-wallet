import React, { useState, useEffect, useRef } from "react";
import { Platform, Text, View, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView, { LatLng, Marker } from "react-native-maps";

const defRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [region, setRegion] = useState(defRegion);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mapRef: React.LegacyRef<MapView> = useRef();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  let coords: LatLng;
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  }

  return (
    <View style={styles.root}>
      <Text>{text}</Text>
      {location && (
        <MapView
          style={{ minHeight: "100%", minWidth: "100%" }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={(region) => setRegion(region)}
          ref={mapRef}
        >
          <Marker
            key={1}
            coordinate={coords}
            title={"Marker"}
            description={"Desc"}
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
