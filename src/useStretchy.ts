import { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { StretchyProps } from "./types";

interface useStretchyProps extends Pick<StretchyProps, "imageHeight"> {}
export const useStretchy = ({ imageHeight }: useStretchyProps) => {
  const scrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollOffset.value = e.contentOffset.y;
  });

  const rView = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      width: "100%",
      overflow: "hidden",
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

  return { rView, rImage, scrollHandler };
};
