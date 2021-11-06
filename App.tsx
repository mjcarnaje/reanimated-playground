import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAssets } from "expo-asset";
import { useFonts } from "expo-font";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Home, { RootStackParamList, ROOT_SCREENS } from "./screens/Home";

const AespaPhotos = [
  require("./assets/images/aespa/aespa.jpg"),
  require("./assets/images/aespa/winter.jpg"),
  require("./assets/images/aespa/karina.jpg"),
  require("./assets/images/aespa/ningning.jpg"),
  require("./assets/images/aespa/giselle.jpg"),
];

const InterFonts = {
  "Inter-Thin": require("./assets/fonts/Inter/Inter-Thin.ttf"),
  "Inter-ExtraLight": require("./assets/fonts/Inter/Inter-ExtraLight.ttf"),
  "Inter-Light": require("./assets/fonts/Inter/Inter-Light.ttf"),
  "Inter-Regular": require("./assets/fonts/Inter/Inter-Regular.ttf"),
  "Inter-Medium": require("./assets/fonts/Inter/Inter-Medium.ttf"),
  "Inter-Semibold": require("./assets/fonts/Inter/Inter-SemiBold.ttf"),
  "Inter-Bold": require("./assets/fonts/Inter/Inter-Bold.ttf"),
  "Inter-ExtraBold": require("./assets/fonts/Inter/Inter-ExtraBold.ttf"),
  "Inter-Black": require("./assets/fonts/Inter/Inter-Black.ttf"),
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [fontsLoaded] = useFonts({ ...InterFonts });

  const [assetsLoaded] = useAssets([...AespaPhotos]);

  if (!fontsLoaded || !assetsLoaded) {
    return (
      <View style={styles.container}>
        <Text>App Loading..</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
        {(Object.keys(ROOT_SCREENS) as (keyof typeof ROOT_SCREENS)[]).map(
          (name) => (
            <Stack.Screen
              key={name}
              name={name}
              getComponent={() => ROOT_SCREENS[name].component}
              options={{
                ...ROOT_SCREENS[name].screenOptions,
                title: ROOT_SCREENS[name].title,
              }}
            />
          )
        )}
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
