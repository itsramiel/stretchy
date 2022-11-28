import Animated from "react-native-reanimated";
import { ScrollViewProps, View } from "react-native";

import { StretchyProps } from "../types";
import { useStretchy } from "../useStretchy";
import { Container } from "./Container";

interface StretchyScrollViewProps extends ScrollViewProps, StretchyProps {}
export const StretchyScrollView = ({ imageSource, imageHeight, foreground, ...props }: StretchyScrollViewProps) => {
  const { rImage, rView, scrollHandler } = useStretchy({ imageHeight });

  return (
    <Container>
      <Animated.ScrollView
        {...props}
        contentOffset={{ x: 0, y: -imageHeight }}
        contentContainerStyle={{ paddingTop: imageHeight }}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      />
      <Animated.View style={rView} pointerEvents="none">
        <Animated.Image source={imageSource} style={rImage} />
        {foreground}
      </Animated.View>
    </Container>
  );
};
