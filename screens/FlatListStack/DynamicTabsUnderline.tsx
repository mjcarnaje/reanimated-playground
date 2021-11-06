import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const { width: deviceWidth, height } = Dimensions.get("window");

const aespaImages = {
  Aespa: require("../../assets/images/aespa/aespa.jpg"),
  Winter: require("../../assets/images/aespa/winter.jpg"),
  Karina: require("../../assets/images/aespa/karina.jpg"),
  NingNing: require("../../assets/images/aespa/ningning.jpg"),
  Giselle: require("../../assets/images/aespa/giselle.jpg"),
};

type IData = {
  key: string;
  name: string;
  image: any;
  ref: React.RefObject<View>;
}[];

const data = Object.keys(aespaImages).map((idx) => ({
  key: idx,
  name: idx,
  image: aespaImages[idx as keyof typeof aespaImages],
  ref: React.createRef<View>(),
}));

type IMeasurement = { x: number; y: number; width: number; height: number };

function Indicator({
  measures,
  scrollX,
}: {
  measures: IMeasurement[];
  scrollX: Animated.Value;
}) {
  const inputRange = data.map((_, i) => deviceWidth * i);

  const width = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((m) => m.width),
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((m) => m.x),
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        height: 4,
        width: width,
        left: 0,
        backgroundColor: "#fff",
        bottom: -10,
        transform: [{ translateX }],
      }}
    />
  );
}

function Tabs({
  data,
  scrollX,
  tabOnPress,
}: {
  data: IData;
  scrollX: Animated.Value;
  tabOnPress: (idx: number) => void;
}) {
  const [measures, setMeasures] = useState<IMeasurement[]>([]);
  const containerRef = useRef<View>(null);

  useEffect(() => {
    let m: IMeasurement[] = [];
    data.forEach((item) => {
      item.ref?.current?.measureLayout(
        // @ts-ignore
        containerRef.current,
        (x, y, width, height) => {
          m.push({ x, y, width, height });

          if (m.length === data.length) {
            setMeasures(m);
          }
        },
        () => {
          console.error("something went wrong");
        }
      );
    });
  }, []);

  return (
    <View style={{ position: "absolute", top: 72, width: deviceWidth }}>
      <View
        ref={containerRef}
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {data.map((item, idx) => {
          return (
            <TouchableOpacity key={item.key} onPress={() => tabOnPress(idx)}>
              <View ref={item.ref}>
                <Text
                  style={{
                    fontFamily: "Inter-Bold",
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
}

export default function DynamicTabsUnderline() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const tabOnPress = useCallback((idx) => {
    flatListRef.current?.scrollToOffset({ offset: idx * deviceWidth });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => {
          return (
            <View style={{ width: deviceWidth, flex: 1 }}>
              <Image
                source={item.image}
                style={{ width: deviceWidth, flex: 1, resizeMode: "cover" }}
              />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  { backgroundColor: "rgba(0,0,0,.3)" },
                ]}
              />
            </View>
          );
        }}
      />
      <Tabs data={data} scrollX={scrollX} tabOnPress={tabOnPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
