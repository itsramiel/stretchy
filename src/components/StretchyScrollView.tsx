import { ImageSourcePropType, Platform, ScrollViewProps, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

interface StretchyScrollViewProps extends ScrollViewProps {
  imageSource: ImageSourcePropType;
  imageHeight: number;
}
export const StretchyScrollView = ({ imageSource, imageHeight, ...props }: StretchyScrollViewProps) => {
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
      height: "100%",
      width: "100%",
      transform: [{ scale: interpolate(scrollOffset.value, [-imageHeight, 0, imageHeight], [1.5, 1, 1], Extrapolate.CLAMP) }],
    };
  }, [imageHeight, scrollOffset]);

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
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
      </Animated.View>
    </View>
  );
};
