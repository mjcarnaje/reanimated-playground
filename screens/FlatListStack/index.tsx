import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BlurredCarousel from "./BlurredCarousel";
import SlickCarousel from "./SlickCarousel";
import FlatListHome from "./FlatListHome";
import ParallaxCarousel from "./ParallaxCarousel";

export const FLATLIST_SCREENS = {
  SlickCarousel: {
    title: "Slick Carousel",
    component: SlickCarousel,
  },
  BlurredCarousel: {
    title: "Blurred Carousel",
    component: BlurredCarousel,
  },
  ParallaxCarousel: {
    title: "Parallax Carousel",
    component: ParallaxCarousel,
  },
};

export type FlatListStackParams = { FlatListHome: undefined } & {
  [P in keyof typeof FLATLIST_SCREENS]: undefined;
};

const FlatListStack = createNativeStackNavigator<FlatListStackParams>();

export default function FlatListStackScreen() {
  return (
    <FlatListStack.Navigator screenOptions={{ headerShown: false }}>
      <FlatListStack.Screen name="FlatListHome" component={FlatListHome} />
      {(Object.keys(FLATLIST_SCREENS) as (keyof typeof FLATLIST_SCREENS)[]).map(
        (name) => (
          <FlatListStack.Screen
            key={name}
            name={name}
            getComponent={() => FLATLIST_SCREENS[name].component}
            options={{ title: FLATLIST_SCREENS[name].title }}
          />
        )
      )}
    </FlatListStack.Navigator>
  );
}
