import { ImageSourcePropType, Platform, FlatListProps, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

interface StretchyFlatListProps<T> extends FlatListProps<T> {
  imageSource: ImageSourcePropType;
  imageHeight: number;
  foreground: React.ReactNode;
}
export const StretchyFlatList = <T,>({ imageSource, imageHeight, foreground, ...props }: StretchyFlatListProps<T>) => {
  const scrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollOffset.value = e.contentOffset.y;
  });

  const rView = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -interpolate(scrollOffset.value, [0, imageHeight], [0, imageHeight], Extrapolate.CLAMP) }],
      height: imageHeight + (scrollOffset.value < 0 ? Math.abs(scrollOffset.value) : 0),
    };
  }, [scrollOffset, imageHeight]);

  const rImage = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(scrollOffset.value, [-imageHeight, 0, imageHeight], [1.5, 1, 1], Extrapolate.CLAMP) }],
      position: "absolute",
      width: "100%",
      height: "100%",
    };
  }, [imageHeight, scrollOffset]);

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        {...props}
        contentOffset={{ x: 0, y: -imageHeight }}
        contentContainerStyle={{ paddingTop: imageHeight }}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      />
      <Animated.View
        style={[{ position: "absolute", top: 0, width: "100%", overflow: "hidden" }, { height: imageHeight }, rView]}
        pointerEvents="none"
      >
        <Animated.Image source={imageSource} style={rImage} />
        {foreground}
      </Animated.View>
    </View>
  );
};
