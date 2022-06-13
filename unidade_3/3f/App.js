import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { Accelerometer } from "expo-sensors";

export default function App() {
  [movement, setMovement] = useState(0);

  useEffect(() => {
    Accelerometer.addListener((item) => setMovement(item.x * -100));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Image
        source={require("./assets/road.gif")}
        style={{ width: "100%", height: "30%" }}
      />
      <View
        style={{
          position: "absolute",
          paddingTop: 40,
          left: movement + 150,
        }}
      >
        <Image
          source={require("./assets/car.png")}
          style={{
            width: 90,
            height: 60,
          }}
        />
      </View>
    </View>
  );
}