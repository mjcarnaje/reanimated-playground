import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList, ROOT_SCREENS } from "../App";

export default function Home({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>React Native Reanimated Playground</Text>
        <View style={{ paddingVertical: 20 }}>
          {(Object.keys(ROOT_SCREENS) as (keyof typeof ROOT_SCREENS)[]).map(
            (name, idx) => (
              <TouchableOpacity
                key={`${idx}-${name}`}
                onPress={() => navigation.navigate(name)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  {ROOT_SCREENS[name].title}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 28,
  },
  button: {
    padding: 10,
    width: "100%",
    backgroundColor: "#A5BBFF",
    borderRadius: 4,
    marginVertical: 4,
  },
  buttonText: {
    fontFamily: "Inter-Semibold",
    color: "#fff",
  },
});
