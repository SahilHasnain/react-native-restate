import { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSegments } from "expo-router";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import "./global.css";
import GlobalProvider from "@/lib/global-provider";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  // hide splash when fonts are ready
  const segments = useSegments();
  const showCredit = segments.length === 1 && segments[0] === "sign-in";
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // custom splash with credit before app loads
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/japan.png")}
          style={{
            width: "100%", // Set width to full
            height: 500,
            resizeMode: "cover",
          }}
        />
        <View style={styles.creditContainer}>
          <Text style={styles.creditText}>Developed by Ubaid Raza</Text>
        </View>
      </View>
    );
  }

  return (
    <GlobalProvider>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
        {showCredit && (
          <View style={styles.creditContainer}>
            <Text style={styles.creditText}>Developed by Ubaid Raza</Text>
          </View>
        )}
      </View>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  creditContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    alignItems: "center",
  },
  creditText: {
    color: "#888",
    fontSize: 12,
  },
});
