import React, { useState, useEffect } from "react";
import { ToastAndroid, View } from "react-native";
import MapView, { MAP_TYPES, PROVIDER_GOOGLE } from "react-native-maps";
import {
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";

export default function App() {
  const [region, setRegion] = useState({});

  const updateRegion = async () => {
    const currentPosition = await getCurrentPositionAsync({ accuracy: 4 });
    console.log(currentPosition);
    setRegion({
      latitude: currentPosition.coords.latitude,
      longitude: currentPosition.coords.longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
    });
  };

  useEffect(() => {
    const permission = getForegroundPermissionsAsync();
    permission.then((permissionStatus) => {
      if (permissionStatus.granted) {
        ToastAndroid.show("Authorized to use location!", ToastAndroid.SHORT);
        updateRegion().catch((err) => console.error(err));
      } else if (permissionStatus.canAskAgain) {
        const permissionRequest = requestForegroundPermissionsAsync();
        permissionRequest.then((permissionResponse) => {
          if (permissionResponse.granted) {
            ToastAndroid.show(
              "Authorized to use location!",
              ToastAndroid.SHORT
            );
            updateRegion().catch((err) => console.error(err));
          } else {
            ToastAndroid.show(
              "Not authorized to use location!",
              ToastAndroid.SHORT
            );
          }
        });
      } else {
        ToastAndroid.show(
          "Not authorized to use location!",
          ToastAndroid.SHORT
        );
      }
    });
  }, []);

  return (
    <MapView
        style={{ flex: 1, marginTop: 100, margin: 20 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={region}
        mapType={MAP_TYPES.HYBRID}
      ></MapView>
  );
}
