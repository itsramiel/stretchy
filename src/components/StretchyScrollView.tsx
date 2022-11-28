import { Image, ImageSourcePropType, Platform, ScrollView, ScrollViewProps, View } from "react-native";
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
  const inset = Platform.OS === "ios" ? imageHeight : 0;
  const scrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollOffset.value = e.contentOffset.y;
  });

  const rView = useAnimatedStyle(() => {
    const noramlizedOffset = scrollOffset.value + (Platform.OS === "ios" ? inset : 0);
    return {
      transform: [{ translateY: -interpolate(noramlizedOffset, [0, imageHeight], [0, imageHeight], Extrapolate.CLAMP) }],
      height: imageHeight + (noramlizedOffset < 0 ? Math.abs(noramlizedOffset) : 0),
    };
  }, [inset, scrollOffset, imageHeight]);

  const rImage = useAnimatedStyle(() => {
    const noramlizedOffset = scrollOffset.value + (Platform.OS === "ios" ? inset : 0);
    return {
      height: imageHeight + (noramlizedOffset < 0 ? Math.abs(noramlizedOffset) : 0),
      width: "100%",
      transform: [{ scale: interpolate(noramlizedOffset, [-imageHeight, 0, imageHeight], [2, 1, 1]) }],
    };
  }, [imageHeight, scrollOffset, inset]);

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        {...props}
        contentInset={{ top: imageHeight }}
        contentOffset={{ x: 0, y: -imageHeight }}
        contentContainerStyle={Platform.select({
          android: { paddingTop: imageHeight },
        })}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      />
      <Animated.View
        style={[{ position: "absolute", top: 0, width: "100%", overflow: "hidden" }, { height: imageHeight }, rView]}
      >
        <Animated.Image source={imageSource} style={rImage} />
      </Animated.View>
    </View>
  );
};
