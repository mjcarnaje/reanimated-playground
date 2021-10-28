import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AdvancedFlatListCarousel from "./screens/AdvancedFlatListCarousel";

const Stack = createNativeStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Thin": require("./assets/fonts/Inter/Inter-Thin.ttf"),
    "Inter-ExtraLight": require("./assets/fonts/Inter/Inter-ExtraLight.ttf"),
    "Inter-Light": require("./assets/fonts/Inter/Inter-Light.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter/Inter-Medium.ttf"),
    "Inter-Semibold": require("./assets/fonts/Inter/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("./assets/fonts/Inter/Inter-ExtraBold.ttf"),
    "Inter-Black": require("./assets/fonts/Inter/Inter-Black.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>App Loading..</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Advanced FlatList Carousel"
          component={AdvancedFlatListCarousel}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
